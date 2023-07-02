import boto3


class Messager:

    def __init__(self, phone_number, message, name="", country_code="+91"):
        self.client = boto3.client('sns', 'ap-south-1')
        self.phone_number = phone_number
        self.country_code = country_code
        self.message = message
        self.name = name

    def send_message(self):
        msg = self.message.format(name=self.name)
        p_num = self.country_code + self.phone_number
        try:
            self.client.publish(PhoneNumber=p_num, Message=msg)
            return True
        except Exception as ex:
            print(ex)
            return False
    
    def send_many(self):
        msg = self.message.format(name=self.name)
        try:
            for num in self.phone_number:
                p_num = self.country_code + num
                self.client.publish(PhoneNumber=p_num, Message=msg)
            return True
        except Exception as ex:
            print(ex)
            return False

class AppMessager:

    def __init__(self, phone_number, name="", country_code="+91"):
        self.client = boto3.client('sns', 'ap-south-1')
        self.phone_number = phone_number
        self.country_code = country_code
        self.message = ""
        self.name = name

    def send_otp(self, otp):
        msg = "Welcome to Hermes, your OTP is {otp}".format(otp=otp)
        p_num = self.country_code + self.phone_number
        try:
            self.client.publish(PhoneNumber=p_num, Message=msg)
            return True
        except Exception as ex:
            print(ex)
            return False
