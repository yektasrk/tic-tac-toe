from browser import document, window, alert, timer
import traceback
import random


class Game:
    def __init__(self):
        self.board = [[document["a"], document["b"], document["c"]],
                      [document["d"], document["e"], document["f"]],
                      [document["g"], document["h"], document["i"]]]
        self.timer = None
        self.turn = "O"

    def run_game(self):
        self.turn = "X" if self.turn == "O" else "O"
        try:
            cell = self.run_code()
            if self._cell_empty(cell):
                cell.innerHTML = f"""<span style="color:black; font-weight: 600; font-size:36pt">{self.turn}</span>"""
            else:
                self.end_game(
                    f"error for {self.turn}: Cell is not empty!")
        except Exception as e:
            error_message = traceback.format_exc()
            self.end_game(f"error for {self.turn}: {error_message}")

        if self.check_game_end(self.turn):
            self.end_game()

    def check_game_end(self, player):
        for i in range(3):
            if self.board[i][0].innerText == self.board[i][1].innerText == self.board[i][2].innerText == player:
                return True
            if self.board[0][i].innerText == self.board[1][i].innerText == self.board[2][i].innerText == player:
                return True
        if self.board[0][0].innerText == self.board[1][1].innerText == self.board[2][2].innerText == player:
            return True
        if self.board[0][2].innerText == self.board[1][1].innerText == self.board[2][0].innerText == player:
            return True

        fin = True
        for i in range(3):
            for j in range(3):
                if self._cell_empty(self.board[i][j]):
                    fin = False
        return fin

    def end_game(self, message=None):
        timer.clear_interval(self.timer)
        document["play"].disabled = False
        document["clear"].disabled = False
        if message:
            alert(message)

    def rand(self):
        choices = []
        for i in range(3):
            for j in range(3):
                if self._cell_empty(self.board[i][j]):
                    choices.append(self.board[i][j])
        return random.choice(choices)

    def ai(self):
        for i in range(3):
            for j in range(3):
                if self._cell_empty(self.board[i][j]):
                    return self.board[i][j]

    def run_code(self):
        if document[f"AI{self.turn}"].checked:
            return self.ai()

        _cells_list = [self.board[i][j].innerText for i in range(3) for j in range(3)]
        _keys = "abcdefghi"
        a, b, c, d, e, f, g, h, i = _cells_list
        cells = dict(zip(_keys, _cells_list))

        result = ""
        _locals = locals()
        if self.turn == 'X':
            exec(window.editorX.getValue(), globals(), _locals)
        else:
            exec(window.editorO.getValue(), globals(), _locals)
        result = _locals['result']
        if result:
            return document[result]
        return self.rand()

    def _cell_empty(self, cell):
        return cell.innerText != "X" and cell.innerText != "O"
