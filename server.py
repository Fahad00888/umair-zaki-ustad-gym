#!/usr/bin/env python3
"""Umair Zaki Ustad website server.

Serves the public/ folder and saves contact-form enquiries to enquiries.csv.
Run with: python3 server.py   then open http://localhost:8080
"""
import csv
import json
import re
from datetime import datetime
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Lock

ROOT = Path(__file__).resolve().parent
ENQUIRIES = ROOT / "enquiries.csv"  # Kept outside public/ so visitors cannot download it.
FIELDS = ["name", "phone", "email", "interest", "time", "message"]
LIMITS = {"name": 80, "phone": 20, "email": 120, "interest": 80, "time": 40, "message": 1000}
MAX_BODY = 10_000
write_lock = Lock()


def clean(data):
    """Return (values, error). Values are safe to store in a spreadsheet."""
    values = {}
    for field in FIELDS:
        value = str(data.get(field, "")).strip()[: LIMITS[field]]
        # Stops a spreadsheet treating submitted text as a formula.
        if field != "phone" and value[:1] in ("=", "+", "-", "@"):
            value = "'" + value
        values[field] = value
    if len(values["name"]) < 2:
        return None, "Please enter your name."
    if not re.fullmatch(r"\+?[0-9][0-9 ()-]{6,18}", values["phone"]):
        return None, "Please enter a valid phone number."
    if values["email"] and not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", values["email"]):
        return None, "Please enter a valid email address."
    return values, None


class Handler(SimpleHTTPRequestHandler):
    def send_json(self, status, payload):
        body = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        if self.path != "/api/enquiry":
            return self.send_json(404, {"error": "Not found."})
        try:
            length = int(self.headers.get("Content-Length", 0))
        except ValueError:
            length = 0
        if not 0 < length <= MAX_BODY:
            return self.send_json(400, {"error": "Invalid request."})
        try:
            data = json.loads(self.rfile.read(length))
            if not isinstance(data, dict):
                raise ValueError
        except ValueError:
            return self.send_json(400, {"error": "Invalid request."})
        # Hidden form field that people never see: only bots fill it in.
        if data.get("website"):
            return self.send_json(200, {"ok": True})
        values, error = clean(data)
        if error:
            return self.send_json(400, {"error": error})
        with write_lock:
            is_new = not ENQUIRIES.exists()
            with ENQUIRIES.open("a", newline="", encoding="utf-8") as file:
                writer = csv.writer(file)
                if is_new:
                    writer.writerow(["received", *FIELDS])
                writer.writerow([datetime.now().isoformat(timespec="seconds"),
                                 *(values[f] for f in FIELDS)])
        self.send_json(200, {"ok": True})


if __name__ == "__main__":
    handler = partial(Handler, directory=str(ROOT / "public"))
    print("Umair Zaki Ustad website: http://localhost:8080", flush=True)
    ThreadingHTTPServer(("127.0.0.1", 8080), handler).serve_forever()
