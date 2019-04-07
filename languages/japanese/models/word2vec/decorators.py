import time
import sys

def exception_handler(f):
    def handle_exception(*args, **kwargs):
        try:
            f(*args, **kwargs)
        except:
            print(f"ERROR: The function '{f.__name__}' encountered an exception of type {sys.exc_info()[0]}")
    return handle_exception

def measure_runtime(f):
    def in_seconds(*args, **kwargs):
        start = time.time()
        f(*args, **kwargs)
        end = time.time()
        print(f"This function took {end-start} seconds")
    return in_seconds