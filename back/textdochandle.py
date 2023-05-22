from random import choice
import os 


class suggs: 
    def __init__(self, filename):
        script_directory = os.path.dirname(os.path.abspath(__file__))
        self.filename = filename
        filepath = os.path.join(script_directory, self.filename)
        with open(filepath, 'r') as file: 
            self.text = file.read()
        self.phrases = self.text.split(' : ')
        self.phrases = self.phrases[:-1]

    def get_phrases(self):
        return self.phrases 
    def get_phrase(self):
        return choice(self.phrases)
    
if __name__ == '__main__':
    sugg = suggs('advice.txt')
    print(sugg.get_phrases())
    print(sugg.get_phrase())
