class Templates:
    otp_template = """
        <div class="bg" style="font-family: sans-serif;background-color: #EFFEF4;display: flex;align-items: center;justify-content: center;padding: 20px;width:400px;">
        <div class="page">
        <div class="top" style="background-color: #FF914D;padding: 15px 10px;font-family: sans-serif;margin: 0;border-radius: 20px 20px 0 0;box-shadow: 1px 1px 10px -6px black;width:400px;">
        <h3>Hi, {name}</h3>
        <h1>Welcome To Hermes</h1>
        </div>
        <div class="main" style="background-color: #F8FED8;padding: 20px 10px;font-family: sans-serif;box-shadow: 1px 1px 10px -6px black;width:400px;">
        <p>Thank you for joining our messaging platform.</p>
        <h4>Your OTP is:</h4>
        <h3>{otp}</h3>
        </div>
        <div class="footer" style="background-color: #17A34B;padding: 5px;color: #FFFFFF;font-family: sans-serif;text-align: center;border-radius: 0 0 20px 20px;box-shadow: 1px 1px 10px -6px black;width:410px;">
        <p>Built in India, For the World</p>
        </div>
        </div>
        </div>
        """