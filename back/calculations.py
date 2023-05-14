# data and formulas from:
'''
https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references
https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwidzO6fsPP-AhWKK1kFHdZVBOsQFnoECDEQAQ&url=https%3A%2F%2Fsurroundedbymath.com%2Finteractive-math%2Festimate-the-greenhouse-gas-emissions-associated-with-your-diet%2F&usg=AOvVaw0XDr8X9p_v1IA30gQkhxpt
https://eating-better.org/downloads/Eating_Better_Biodiversity_report.pdf
source: Carlsson-Kanyama, A., & González, A. D. (2009). Potential contributions of food consumption patterns to climate change. The American Journal of Clinical Nutrition, 89(5), 1704S-1709S.)
source: Scarborough, P., et al. (2014). Dietary greenhouse gas emissions of meat-eaters, fish-eaters, vegetarians and vegans in the UK. Climatic Change, 125(2), 179-192.)
source: Poore, J., & Nemecek, T. (2018). Reducing food’s environmental impacts through producers and consumers. Science, 360(6392), 987-992.)
source: Parker, H. M., et al. (2018). The environmental impact of food choices: carbon, water, and land use. Food and Agriculture Organization of the United Nations.)
source: Carlsson-Kanyama, A., & González, A. D. (2009). Potential contributions of food consumption patterns to climate change. The American Journal of Clinical Nutrition, 89(5), 1704S-1709S.)
source: Weber, C. L., & Matthews, H. S. (2008). Food-miles and the relative climate impacts of food choices in the United States. Environmental Science & Technology, 42(10), 3508-3513.)

https://www.youtube.com/watch?v=A_V14e6zC6s

https://www.wichitaliberty.org/economics/weekly-gasoline-purchases-2022-06/

https://kohalacenter.org/HISGN/pdf/carbofoodprint.pdf

https://www.bensnaturalhealth.com/blog/general-health/average-american-diet-and-exercise/

https://dev.to/ramonak/react-how-to-create-a-custom-progress-bar-component-in-5-minutes-2lcl

'''

# gallons of gas to co2 emissions in grams
def gallOfGas(gas):
    return float(8887*gas)

# gallons of diesel to co2 emissions in grams
def gallOfDies(dies):
    return float(10180 * dies)

def internal_food_calc(beef, lamb, pork, poultry, fish_seafood, cheese, milk, fruits_veggies, wheat, rice):
    meat = (beef + lamb + pork + poultry + fish_seafood)/5
    dairy = (cheese + milk)/2
    veggies_fruits = fruits_veggies
    grain = (wheat + rice)/2

    return [meat, dairy, veggies_fruits, grain]


# food calculations co2 emissions in grams
def food(calories, meats, dairy, fruits_veggies, grains):
    # c02 in grams per cal 
    m = 0.0095*1000
    d = 0.0056*1000
    f = 0.0009*1000
    g = 0.00175*1000

    # number of cals consumed
    me = float(calories) * float(meats)/100
    da = float(calories) * float(dairy)/100
    fr = float(calories) * float(fruits_veggies)/100
    gr = float(calories) * float(grains)/100

    # final calc
    return 7*((me*m) + (da*d) + (fr*f) + (gr*g))  # multiply by 7 to include whole week

if __name__ == '__main__':
    x = internal_food_calc(20/1000, 16/1000, 5/1000, 4/1000, 2.5/1000, 10/1000, 1.2/1000, .9/1000, .7/1000, 2.8/1000)
    print(x)
    sum = 0
    for nums in x: 
        sum +=nums
    print(sum)
    meat = x[0]/sum
    dairy = x[1]/sum
    veggies_fruits = x[2]/sum 
    grain = x[3]/sum
    print(meat)
    print(dairy)
    print(veggies_fruits)
    print(grain)

    avgG = 18
    avgD = 14.75875
    avgF = 4.3 * 3112

    print(gallOfGas(avgG) + gallOfDies(avgD) + avgF)

