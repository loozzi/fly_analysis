def HttpResponse(status=200, message="Success", data=None):
    return {"status": status, "message": message, "data": data}
