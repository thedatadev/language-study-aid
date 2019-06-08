import torch
import torch.nn as nn
import torch.nn.functional as F

import training.config as config

forward_counter = 0


class RNN(nn.Module):
    ''' Basic Recurrent Neural Network '''
    
    def __init__(self):
        ''' Describe the network topology '''
        super(RNN, self).__init__()
        self.counter = 0

        self.criterion = nn.CrossEntropyLoss()

        self.hidden_size = config.hidden_size
        self.concat_size = config.input_size + config.hidden_size
            
        self.i2h = nn.Linear(self.concat_size, config.hidden_size)
        self.i2o = nn.Linear(self.concat_size, config.output_size)
        self.softmax = nn.LogSoftmax(dim=1)

    def forward(self, input, hidden):
        ''' Describe the flow from input layer to output layer '''
        global forward_counter

        combined = torch.cat((input, hidden), 1)

        hidden = self.i2h(combined)
        output = self.i2o(combined)
        output = self.softmax(output)
        

        forward_counter += 1
        print(forward_counter)


        return output, hidden

    def initHidden(self):
        ''' Initial hidden state of all zeros '''
        return torch.zeros(1, self.hidden_size)