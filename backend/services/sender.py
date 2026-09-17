import yagmail

class Sender:

    def __init__(self, key, mail):
        self.key = key
        self.mail = mail
        self.yag = yagmail.SMTP(self.mail, self.key)

    def send(self, content):

        words = content["body"].strip().split()
       
        if len(words) < 10:
            return {
                "status": False,
                "err": "Message must contain at least 10 words."
            }
        if len(words) > 5000:
            return {
                "status": False,
                "err": "Message must contain at most 5000 words."
            }
        try:
            self.yag.send(
                self.mail,
                content["subject"],
                content["body"]
            )
            return {
                "status": True
            }
        except Exception as e:
            return {
                "status": False,
                "err": str(e)
            }