from RPi import GPIO
import time
import requests
from RPLCD.i2c import CharLCD

GPIO.setmode(GPIO.BCM)

button_no = 5
IR_no = [6, 13, 19, 26]
IR_money = [1, 5, 10, 50]
IR_last_time = [-1, -1, -1, -1]
upload_url = "http://localhost:8080/box_upload"
wallet_num = 3

refresh_rate = 100
pending_time = refresh_rate//2
last_act_time = -1
money_cnt = 0
wallet_cnt = -1
wallet = 0

def LCD_update(money_cnt, wallet, msg_add = ""):
    if(money_cnt > 0):
        msg = f"NTD{money_cnt} to proj{wallet}"
        msg = msg + (32-len(msg)-len(msg_add))*" " + msg_add 
        lcd.write_string(msg)
        print(msg)
    else:
        msg = f"Donate to proj{wallet}"
        msg = msg + (32-len(msg)-len(msg_add))*" " + msg_add
        lcd.write_string(msg)
        print(msg)

for IR in IR_no:
    GPIO.setup(IR, GPIO.IN)
GPIO.setup(button_no, GPIO.IN)

lcd = CharLCD(i2c_expander='PCF8574', address=0x27, port=1, cols=16, rows=2, dotsize=8)
lcd.clear()
LCD_update(money_cnt, wallet, msg_add = "<Donation Box>")

while True:
    if last_act_time >= 15*refresh_rate - 1:
        last_act_time = -1
        LCD_update(money_cnt, wallet, msg_add = "<Donation Box>")
    elif last_act_time == 10*refresh_rate - 1:
        data = {
            "money": money_cnt,
            "time": time.time(),
            "wallet": wallet
        }
        try:
            response = requests.post(upload_url, json = data)
        except:
            print("Response Failure")
        print(f"Donate {money_cnt}.")
        LCD_update(money_cnt, wallet, msg_add = "Sent, thank you")
        last_act_time = last_act_time + 1
        money_cnt = 0
    elif last_act_time >= 0:
        last_act_time = last_act_time + 1
    else:
        last_act_time = -1
        money_cnt = 0
    
    if not GPIO.input(button_no):
        wallet_cnt = -1
    else:
        if wallet_cnt == 5:
            wallet = (wallet+1)%wallet_num
            wallet_cnt = 6
            LCD_update(money_cnt, wallet, msg_add = f"Change to proj{wallet}")
            if last_act_time == -1:
                last_act_time = 10*refresh_rate
        else:
            wallet_cnt = wallet_cnt + 1

    for i in range(len(IR_no)):
        if IR_last_time[i] <= -1:
            if not GPIO.input(IR_no[i]):
                money_cnt = money_cnt + IR_money[i]
                last_act_time = 0
                print(f"Get {IR_money[i]}")
                IR_last_time[i] = 0
                LCD_update(money_cnt, wallet, msg_add = f"Get {IR_money[i]}")
        elif IR_last_time[i] >= pending_time-1:
            IR_last_time[i] = -1
        else:
            if GPIO.input(IR_no[i]):
                IR_last_time[i] = IR_last_time[i] + 1
            else:
                IR_last_time[i] = 0
    
    time.sleep(1/refresh_rate)
