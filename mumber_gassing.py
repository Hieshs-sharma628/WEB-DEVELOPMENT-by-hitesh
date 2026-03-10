print("\nWelcome to my number guessing name")
lb=input("\nEnter the lower bound::")
ub=input("\nEnter the upper bound::")
number=50;
print("\nNow start guessing")
for i in range(1,8):
    user_enter_number=int(input("\nEnter you guess::"))
    if user_enter_number==number:
        print("\nCongratulation you did it in" ,i, "try")
        break
    elif user_enter_number < number:
        print("\ntoo low! Try again")
    else:
        print("\ntoo high ! try again")
        

