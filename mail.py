import smtplib

sender = 'devssh@immoguna.com'
receivers = ['devasood@gmail.com']

message = """From: From Person """ + sender + """
To: To Person """ + receivers[0] + """
Subject: Immoguna

This is a test e-mail message.
"""

try:
   smtpObj = smtplib.SMTP('localhost')
   smtpObj.sendmail(sender, receivers, message)         
   print("Successfully sent email")
except SMTPException:
   print("Error: unable to send email")
