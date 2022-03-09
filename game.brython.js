__BRYTHON__.use_VFS = true;
var scripts = {"$timestamp": 1646787521872, "game": [".py", "from browser import document,window,alert,timer\nimport traceback\nimport random\n\n\nclass Game:\n def __init__(self):\n  self.board=[[document[\"a\"],document[\"b\"],document[\"c\"]],\n  [document[\"d\"],document[\"e\"],document[\"f\"]],\n  [document[\"g\"],document[\"h\"],document[\"i\"]]]\n  self.timer=None\n  self.turn=\"O\"\n  \n def run_game(self):\n  self.turn=\"X\"if self.turn ==\"O\"else \"O\"\n  try :\n   cell=self.run_code()\n   if self._cell_empty(cell):\n    cell.innerHTML=f\"\"\"<span style=\"color:black; font-weight: 600; font-size:36pt\">{self.turn}</span>\"\"\"\n   else :\n    self.end_game(\n    f\"error for {self.turn}: Cell is not empty!\")\n  except Exception as e:\n   error_message=traceback.format_exc()\n   self.end_game(f\"error for {self.turn}: {error_message}\")\n   \n  if self.check_game_end(self.turn):\n   self.end_game()\n   \n def check_game_end(self,player):\n  for i in range(3):\n   if self.board[i][0].innerText ==self.board[i][1].innerText ==self.board[i][2].innerText ==player:\n    return True\n   if self.board[0][i].innerText ==self.board[1][i].innerText ==self.board[2][i].innerText ==player:\n    return True\n  if self.board[0][0].innerText ==self.board[1][1].innerText ==self.board[2][2].innerText ==player:\n   return True\n  if self.board[0][2].innerText ==self.board[1][1].innerText ==self.board[2][0].innerText ==player:\n   return True\n   \n  fin=True\n  for i in range(3):\n   for j in range(3):\n    if self._cell_empty(self.board[i][j]):\n     fin=False\n  return fin\n  \n def end_game(self,message=None ):\n  timer.clear_interval(self.timer)\n  document[\"play\"].disabled=False\n  document[\"clear\"].disabled=False\n  if message:\n   alert(message)\n   \n def rand(self):\n  choices=[]\n  for i in range(3):\n   for j in range(3):\n    if self._cell_empty(self.board[i][j]):\n     choices.append(self.board[i][j])\n  return random.choice(choices)\n  \n def ai(self):\n  for i in range(3):\n   for j in range(3):\n    if self._cell_empty(self.board[i][j]):\n     return self.board[i][j]\n     \n def run_code(self):\n  if document[f\"AI{self.turn}\"].checked:\n   return self.ai()\n   \n  _cells_list=[self.board[i][j].innerText for i in range(3)for j in range(3)]\n  _keys=\"abcdefghi\"\n  a,b,c,d,e,f,g,h,i=_cells_list\n  cells=dict(zip(_keys,_cells_list))\n  \n  result=\"\"\n  _locals=locals()\n  if self.turn =='X':\n   exec(window.editorX.getValue(),globals(),_locals)\n  else :\n   exec(window.editorO.getValue(),globals(),_locals)\n  result=_locals['result']\n  if result:\n   return document[result]\n  return self.rand()\n  \n def _cell_empty(self,cell):\n  return cell.innerText !=\"X\"and cell.innerText !=\"O\"\n", ["browser", "random", "traceback"]]}
__BRYTHON__.update_VFS(scripts)
