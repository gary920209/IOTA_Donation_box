from RPi import GPIO
import time
import requests

GPIO.setmode(GPIO.BCM)

IR_no = [5, 6, 13, 19]
IR_money = [1, 5, 10, 50]
upload_url = "http://localhost:8080/box_upload"

refresh_rate = 10
last_act_time = -1
money_cnt = 0

def direct_IOTA():
    return None

for IR in IR_no:
    GPIO.setup(IR, GPIO.IN)

try:
    while True:
        if last_act_time == refresh_rate:
            data = {
                "money": money_cnt,
                "time": time.time()
            }
            response = direct_IOTA()
            if response == None:
                response = requests.post(upload_url, json = data)
            last_act_time = -1
            money_cnt = 0
        elif last_act_time >= 0:
            last_act_time = last_act_time + 1
        else:
            last_act_time = -1
            money_cnt = 0
        
        for i in len(IR_no):
            if not GPIO.input(IR_no[i]):
                money_cnt = money_cnt + IR_money[i]
                last_act_time = 0
        
        time.sleep(1/refresh_rate)
except:
    GPIO.cleanup()