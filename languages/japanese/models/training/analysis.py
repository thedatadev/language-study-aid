import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import pickle

def report_loss(loss):
    plt.plot(loss)
    plt.xlabel("epochs")
    plt.ylabel("loss")
    plt.show()

def report_accuracy(acc):
    plt.plot(acc)
    plt.xlabel("epochs")
    plt.ylabel("accuracy")
    plt.show()

def load_statistic(statistic):
    path = f"{statistic}.pkl"
    with open(path, "rb") as f:
        return pickle.load(f)
