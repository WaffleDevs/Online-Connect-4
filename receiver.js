var winsets = [[1, 2, 3, 4],[2, 3, 4, 5],[3, 4, 5, 6],[4, 5, 6, 7],[8, 9, 10, 11],[9, 10, 11, 12],[10, 11, 12, 13],[11, 12, 13, 14],[15, 16, 17, 18],[16, 17, 18, 19],[17, 18, 19, 20],[18, 19, 20, 21],[22, 23, 24, 25],[23, 24, 25, 26],[24, 25, 26, 27],[25, 26, 27, 28],[29, 30, 31, 32],[30, 31, 32, 33],[31, 32, 33, 34],[32, 33, 34, 35],[1, 8, 15, 22],[8, 15, 22, 29],[2, 9, 16, 23],[9, 16, 23, 30],[3, 10, 17, 24],[10, 17, 24, 31],[4, 11, 18, 25],[11, 18, 25, 32],[5, 12, 19, 26],[12, 19, 26, 33],[6, 13, 20, 27],[13, 20, 27, 34],[7, 14, 21, 28],[14, 21, 28, 35],[8, 16, 24, 32],[1, 9, 17, 25],[9, 17, 25, 33],[2, 10, 18, 26],[10, 18, 26, 34],[3, 11, 19, 27],[11, 19, 27, 35],[4, 12, 20, 28],[4, 10, 16, 22],[5, 11, 17, 23],[11, 17, 23, 29],[6, 12, 18, 24],[12, 18, 24, 30],[7, 13, 19, 25],[13, 19, 25, 31],[14, 20, 26, 32],[15, 22, 29, 36],[16, 23, 30, 37],[17, 24, 31, 38],[18, 25, 32, 39],[19, 26, 33, 40],[20, 27, 34, 41],[21, 28, 35, 42],[18, 26, 34, 42],[17, 25, 33, 41],[16, 24, 32, 40],[15, 23, 31, 39],[36, 37, 38, 39],[37, 38, 39, 40],[38, 39, 40, 41],[39, 40, 41, 42],[18, 24, 30, 36],[19, 25, 31, 37],[20, 26, 32, 38],[21, 27, 33, 39],[15, 23, 31, 39],[16, 24, 32, 40],[17, 25, 33, 41],[18, 26, 34, 42]]
var turn = 1
var board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var playing = true

$('html').on('click', '.dot', function() {
  if(turn == 1) return;
  if (!playing) return;
  if (board[this.id - 1] != "0") return;
  var ID;
  if (board[Number(this.id) + 34] == "0") {
    ID = Number(this.id) + 35;
  } else if (board[Number(this.id) + 27] == "0") {
    ID = Number(this.id) + 28;
  } else if (board[Number(this.id) + 20] == "0") {
    ID = Number(this.id) + 21
  } else if (board[Number(this.id) + 13] == "0") {
    ID = Number(this.id) + 14
  } else if (board[Number(this.id) + 6] == "0") {
    ID = Number(this.id) + 7
  } else {
    ID = this.id
  }

  board[ID - 1] = turn
  if (turn == 1) {
    $(`#${ID}`).css("background-color", "red")
    turn = 2
    $("#result").html("Blue's Turn")
  } else {
    turn = 1;
    $("#result").html("Red's Turn")
    $(`#${ID}`).css("background-color", "blue")
  }
  winLogic()
  if (conn && conn.open) {
    let data = `${board};${turn}`;
    conn.send(data);
  }
})
$("#reset").click(function() {
  $("html").removeClass('redwon')
  $("html").removeClass('bluewon')
  $("html").css("background-color", "black")
  $(".dot").css("background-color", "")
  turn = 1
  playing = true
  $("#result").html("Red's Turn")
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
})

function winLogic() {
  for (var i = 0; i < winsets.length; i++) {
    var a = board[winsets[i][0] - 1]
    var b = board[winsets[i][1] - 1]
    var c = board[winsets[i][2] - 1]
    var d = board[winsets[i][3] - 1]
    if (a == "1" && b == "1" && c == "1" && d == "1") {
      playing = false
      $("#result").html("Red Won!")
      $(`#${winsets[i][0]}`).css("background-color", "#400")
      $(`#${winsets[i][1]}`).css("background-color", "#400")
      $(`#${winsets[i][2]}`).css("background-color", "#400")
      $(`#${winsets[i][3]}`).css("background-color", "#400")
      $("html").addClass('redwon')
    } else if (a == "2" && b == "2" && c == "2" && d == "2") {
      playing = false
      $("#result").html("Blue Won!")
      $(`#${winsets[i][0]}`).css("background-color", "#004")
      $(`#${winsets[i][1]}`).css("background-color", "#004")
      $(`#${winsets[i][2]}`).css("background-color", "#004")
      $(`#${winsets[i][3]}`).css("background-color", "#004")
      $("html").addClass('bluewon')
    }
  }
}











var lastPeerId = null;
var peer = null; // Own peer object
var peerId = null;
var conn = null;
var recvId = document.getElementById("receiver-id");

/**
 * Create the Peer object for our end of the connection.
 *
 * Sets up callbacks that handle any events related to our
 * peer object.
 */
 function initialize() {
    // Create own peer object with connection to shared PeerJS server
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let password = ''
    for (var i = 0; i < 4; i++) {
        password = password + chars[Math.floor(Math.random()*52)]
    }

    peer = new Peer(password, {
        debug: 2
    });

    peer.on('open', function (id) {
        // Workaround for peer.reconnect deleting previous id
        if (peer.id === null) {
            console.log('Received null id from peer open');
            peer.id = lastPeerId;
        } else {
            lastPeerId = peer.id;
        }

        console.log('ID: ' + peer.id);
        recvId.innerHTML = "ID: " + peer.id;
        status.innerHTML = "Awaiting connection...";
    });
    peer.on('connection', function (c) {
        // Allow only a single connection
        if (conn && conn.open) {
            c.on('open', function() {
                c.send("Already connected to another client");
                setTimeout(function() { c.close(); }, 500);
            });
            return;
        }

        conn = c;
        console.log("Connected to: " + conn.peer);
        ready();
    });
    peer.on('disconnected', function () {
        console.log('Connection lost. Please reconnect');

        // Workaround for peer.reconnect deleting previous id
        peer.id = lastPeerId;
        peer._lastServerId = lastPeerId;
        peer.reconnect();
    });
    peer.on('close', function() {
        conn = null;
        status.innerHTML = "Connection destroyed. Please refresh";
        console.log('Connection destroyed');
    });
    peer.on('error', function (err) {
        console.log(err);
        alert('' + err);
    });
};

/**
 * Triggered once a connection has been achieved.
 * Defines callbacks to handle incoming data and connection events.
 */
function ready() {
    conn.on('data', function (data) {
        let value = `${data}`.split(';')
        console.log(value)
        board = value[0].split(',')
        console.log(board)
		turn = value[1]
        if(turn == 1) $("#result").html("Red's Turn")
        else $("#result").html("Blue's Turn")

        for(let i = 1; i <= 42; i++){
          console.log(`${i} ${board[i-1]}`)
          if (board[i-1] == 1) {
            $(`#${i}`).css("background-color", "red")
          } else if(board[i-1] == 2) {
            $(`#${i}`).css("background-color", "blue")
          } else {
            $(`#${i}`).css("background-color", "black")
          }
        }
        winLogic()
    });
    conn.on('close', function () {
        status.innerHTML = "Connection reset<br>Awaiting connection...";
        conn = null;
    });
}

initialize();
