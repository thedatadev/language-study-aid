import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

def report(losses):
    plt.plot(losses)
    plt.xlabel("epochs")
    plt.ylabel("loss")
    plt.show()