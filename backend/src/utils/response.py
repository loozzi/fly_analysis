from flask import send_file


def HttpResponse(status=200, message="Success", data=None):
    return {"status": status, "message": message, "data": data}


def HttpFileResponse(file=None):
    return send_file(
        file, as_attachment=True, download_name="predict.csv", mimetype="text/csv"
    )
