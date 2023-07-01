import smtplib
from mailer.templates import otp_template


class Email:

    def __init__(self, receiver, name=""):
        self.sender = "noreply.adhyaay@gmail.com"
        self.receiver = receiver
        self.password = 'cyjszmfvbexgjaau'
        self.old_pass = 'aeugkwjgkhewjatb'
        self.name = name
        self.msg = ""

    def send_otp(self, otp):
        message = otp_template.format(
            receiver=self.receiver, name=self.name, otp=otp)
        try:
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                smtp.login(self.sender, self.password)
                smtp.sendmail(self.sender, self.receiver, message)
            return True
        except Exception as ex:
            print(ex)
            return False
