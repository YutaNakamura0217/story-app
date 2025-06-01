import sys
import os

# Add the 'backend' directory to sys.path to allow 'from app...' imports
# This __init__.py is in backend/tests/
# os.path.dirname(__file__) is backend/tests
# os.path.join(os.path.dirname(__file__), '..') is backend/
# os.path.abspath(...) makes it an absolute path
sys.path.insert(0, os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..')))

# This file makes the tests directory a Python package
