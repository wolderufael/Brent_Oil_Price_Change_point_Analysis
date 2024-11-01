try:
    import pymc as pm
    print("PyMC imported successfully.")
except ImportError as e:
    print(f"Import error: {e}")

try:
    from scipy.signal import gaussian
    print("Gaussian imported successfully.")
except ImportError as e:
    print(f"Import error: {e}")
