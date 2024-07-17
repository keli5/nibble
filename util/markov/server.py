import socket
import json
import markovify

host = '127.0.0.1'
port = 8940
model = None # Generate the model.json with a tool like https://github.com/keli5/easymarkovify

try:
    with open("model.json") as f:
        print("[MKV] Opening model file")
        model_json = json.load(f)
        print("[MKV] Model file loaded, parsing")
        model = markovify.NewlineText.from_json(model_json)
        print("[MKV] Parsed model")
except Exception as e:
    print("Could not open or parse model: " + str(e))
    exit(1)

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind((host, port))
server_socket.listen(5)
print(f"[MKV] Server listening on {host}:{port}")

while True:
    try:
        client_socket, client_address = server_socket.accept()
        client_socket.sendall(model.make_sentence().encode("utf-8"))
        client_socket.close()

    except KeyboardInterrupt:
        print("Server shutting down.")
        break

    except Exception as e:
        print(f"Error: {e}")
        break

# Close the server socket
server_socket.close()
