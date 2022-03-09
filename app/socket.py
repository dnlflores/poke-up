from flask_socketio import SocketIO, send, emit, join_room, leave_room
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://pokeup.herokuapp.com',
        'https://pokeup.herokuapp.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)

def ack():
    print('message was received!')

# handle messages from the client
@socketio.on('message')
def handle_message(data):
    # chat = data['chat']
    print("received message: ", data)
    send(data, broadcast=True)
    return None
    # emit('new_message', data, to=chat)

@socketio.on('json')
def handle_json(json):
    print('received json: ' + str(json))
    send(json, json=True)

@socketio.on('my_event')
def handle_my_custom_event(arg1, arg2, arg3):
    print('received args: ' + arg1 + arg2 + arg3)

@socketio.on('my event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))
    emit('my response', json, callback=ack, broadcast=True)
    return 'one', 2

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)

@socketio.on('connect')
def test_connect(auth):
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')