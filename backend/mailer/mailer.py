import smtplib
from mailer.templates import Templates
from email.mime.text import MIMEText


class Email:
    def __init__(self,sender,reciever,password,msg):
        self.sender = sender
        self.reciever = reciever
        self.password = password
        self.msg = msg
    
    def send_message(self):
        message = self.msg
        html_message = MIMEText(message, 'html')
        html_message['Subject'] = "test mail"
        html_message['From'] = self.sender
        html_message['To'] = self.reciever
        try:
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                smtp.login(self.sender, self.password)
                smtp.sendmail(self.sender, self.reciever, message)
            return True
        except Exception as ex:
            print(ex)
            return False
    
    def send_many(self):
        message = self.msg
        html_message = MIMEText(message, 'html')
        html_message['Subject'] = "test mail"
        html_message['From'] = self.sender
        html_message['To'] = ', '.join(self.reciever)
        try:
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                smtp.login(self.sender, self.password)
                smtp.sendmail(self.sender, self.reciever, html_message.as_string())
            return True
        except Exception as ex:
            print(ex)
            return False

class AppEmail(Email):

    def __init__(self, receiver, name=""):
        self.sender = "noreply.hermesio@gmail.com"
        self.receiver = receiver
        self.password = 'norimxdzqvjqmecp'
        self.old_pass = 'aeugkwjgkhewjatb'
        self.name = name
        self.msg = ""

    def send_otp(self, otp):
        message = Templates.otp_template.format(
            receiver=self.receiver, name=self.name, otp=otp)
        html_message = MIMEText(message, 'html')
        html_message['Subject'] = "test mail"
        html_message['From'] = self.sender
        html_message['To'] = self.receiver
        try:
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                smtp.login(self.sender, self.password)
                smtp.sendmail(self.sender, self.receiver, html_message.as_string())
            return True
        except Exception as ex:
            print(ex)
            return False
