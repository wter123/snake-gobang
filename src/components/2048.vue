<template>
  <div class="game_2048">
    <header>
      <!-- <h2>2048</h2> -->
      <p>score:<span id="score">0</span></p>
    </header>

    <div id="grid-container">
      <div
        class="grid-cell"
        id="grid-cell-0-0"
      ></div>
      <div
        class="grid-cell"
        id="grid-cell-0-1"
      ></div>
      <div
        class="grid-cell"
        id="grid-cell-0-2"
      ></div>
      <div
        class="grid-cell"
        id="grid-cell-0-3"
      ></div>

      <div
        class="grid-cell"
        id="grid-cell-1-0"
      ></div>
      <div
        class="grid-cell"
        id="grid-cell-1-1"
      ></div>
      <div
        class="grid-cell"
        id="grid-cell-1-2"
      ></div>
      <div
        class="grid-cell"
        id="grid-cell-1-3"
      ></div>

      <div
        class="grid-cell"
        id="grid-cell-2-0"
      ></div>
      <div
        class="grid-cell"
        id="grid-cell-2-1"
      ></div>
      <div
        class="grid-cell"
        id="grid-cell-2-2"
      ></div>
      <div
        class="grid-cell"
        id="grid-cell-2-3"
      ></div>

      <div
        class="grid-cell"
        id="grid-cell-3-0"
      ></div>
      <div
        class="grid-cell"
        id="grid-cell-3-1"
      ></div>
      <div
        class="grid-cell"
        id="grid-cell-3-2"
      ></div>
      <div
        class="grid-cell"
        id="grid-cell-3-3"
      ></div>

    </div>
  </div>
</template>

<script >
export default {
  mounted() {
function getPosTop( i , j )
{
	return 20 + i * 120 ;
}

function getPosLeft( i , j )
{
	return 20 + j * 120 ;
}

function getNumberBackgroundColor(number)
{
	switch(number){
			case 2:return "#eee4da";break;
			case 4:return "#ede0c8";break;
			case 8:return "#f2b179";break;
			case 16:return "#f59563";break;
			case 32:return "#f67c5f";break;
			case 64:return "#f65e3b";break;
			case 128:return "#edcf72";break;
			case 256:return "#edcc61";break;
			case 512:return "#9c0";break;
			case 1024:return "#33b5e5";break;
			case 2048:return "#09c";break;
			case 4096:return "#a6c";break;
			case 8192:return "#93c";break;
		}
	return "black" ;
}

function getNumberColor(number)
{
	if(number <= 4)
		return "#776e65";

	return "white";
}
// 判断是否还有空间生成
function nospace(board)
{
	for(var i = 0 ; i < 4 ; i++ )
		for(var j = 0 ; j < 4 ; j++ )
		{
			if(board[i][j] == 0)
				return false ;
		}

	return true ;
}

function getRand44Num()
{
	return parseInt(Math.floor(Math.random() * 4)) ;
}

function getRand24Num()
{
	return Math.random() < 0.5 ? 2 : 4;
}

function canMoveLeft(board)
{
	for(var i = 0 ; i < 4 ; i++ )
		for(var j = 1 ; j < 4 ; j++ )
		{
			if(board[i][j] != 0)
				if(board[i][j-1] == 0 || board[i][j-1] == board[i][j])
					return true ;
		}

	return false ;
}

function canMoveRight(board)
{
	for(var i = 0 ; i < 4 ; i++ )
		for(var j = 2 ; j >= 0 ; j-- )
		{
			if(board[i][j] != 0)
				if(board[i][j+1] == 0 || board[i][j+1] == board[i][j])
					return true ;
		}

	return false ;
}

function canMoveUp(board)
{
	for(var j = 0 ; j < 4 ; j++ )
		for(var i = 1 ; i < 4 ; i++ )	
		{
			if(board[i][j] != 0)
				if(board[i-1][j] == 0 || board[i-1][j] == board[i][j])
					return true ;
		}

	return false ;
}

function canMoveDown(board)
{
	for(var j = 0 ; j < 4 ; j++ )
		for(var i = 2 ; i >= 0 ; i-- )
		{
			if(board[i][j] != 0)
				if(board[i+1][j] == 0 || board[i+1][j] == board[i][j])
					return true ;
		}

	return false ;
}

function noBlockHorizontal(row,col1,col2,board)
{
	for(var i = col1 + 1 ; i < col2 ; i++)
	{
		if(board[row][i] != 0)
			return false ;
	}
	return true ;
}

function noBlockVertical(col,row1,row2,board)
{
	for(var i = row1 + 1 ; i < row2 ; i++)
	{
		if(board[i][col] != 0)
			return false ;
	}
	return true ;
}

function nomove(board)
{
	if(canMoveLeft(board) || canMoveRight(board)
		|| canMoveDown(board) || canMoveUp(board))
		return false ;
	return true ;
}

function showNumberWithAnimation(i , j , randNumber)
{
	var numberCell = $('#number-cell-'+i+'-'+j);
	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
	numberCell.css('color',getNumberColor(randNumber));
	numberCell.text(randNumber);

	numberCell.animate({
		width:"100px",
		height:"100px",
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	}, 50);
}

function showMoveAnimation(fromx , fromy, tox , toy)
{
	var numberCell = $("#number-cell-"+fromx + "-" + fromy);
	numberCell.animate({
		top:getPosTop(tox , toy),
		left:getPosLeft(tox , toy)
	} , 200);
}

// 更新分数
function updateScore(score)
{
	$("#score").text(score);
}

var board = new Array();
var score = 0 ;
var hasConficted = new Array();

$(document).ready(function(){
	newgame();
});

function newgame(){

	// 初始化棋盘格
	init();
	// 随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}

function init(){
	for(var i = 0 ; i < 4 ; i++ )
	{
		board[i] = new Array();
		hasConficted[i] = new Array();
		for(var j = 0 ; j < 4 ; j++ )
		{
			board[i][j] = 0 ;
			hasConficted[i][j] = false ;
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}

	}

	updateBoardView();
	score = 0 ;
}

function updateBoardView()
{
	$(".number-cell").remove();
	for(var i = 0 ; i < 4 ; i++ )
		for(var j = 0 ; j < 4 ; j++ )
		{
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')
			var theNumberCell = $('#number-cell-'+i+'-'+j);
			if(board[i][j] == 0)
			{
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i,j) + 50);
				theNumberCell.css('left',getPosLeft(i,j) + 50);
			}
			else
			{
				theNumberCell.css('width','100px');
				theNumberCell.css('height','100px');
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}

			hasConficted[i][j] = false ;
		}
}


function generateOneNumber()
{
	if(nospace(board))
		return false ; 
	// 随机一个位
	var randx = getRand44Num() ;
	var randy = getRand44Num() ;

	var times = 0 ;
	while(times < 50){
		if(board[randx][randy] == 0)
			break;

		var randx = getRand44Num() ;
		var randy = getRand44Num() ;
		times++ ;
	}

	if(times == 50)
	{
		for(var i = 0 ; i < 4 ; i++ )
		{
			for(var j = 0 ; j < 4 ; j++ )
			{
				if(board[i][j] == 0)
				{
					randx = i ; 
					randy = j ;
				}

			}
		}
	}
	
	// 随机一个数字
	var randNumber = getRand24Num();
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx , randy , randNumber);
	return true ;
}

$(document).keydown(function(event){
	switch(event.keyCode){
		case 37: // left
			if(moveLeft(board)){
				generateOneNumber();
				isgameover();
			}
			break ;
		case 38: // up
			if(moveUp(board)){
				generateOneNumber();
				isgameover();
			}
			break;
		case 39: // right
			if(moveRight(board)){
				generateOneNumber();
				isgameover();
			}
			break;
		case 40: // down
			if(moveDown(board)){
				generateOneNumber();
				isgameover();
			}
			break;
		default:
			break;
	}
});

function moveLeft(board){
	if(!canMoveLeft(board))
		return false ;

	for(var i = 0 ; i < 4 ; i++ )
		for(var j = 1 ; j < 4 ; j++ )
		{
			if(board[i][j] != 0)
			{
				for(var k = 0 ; k < j ; k++)
				{
					if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board))
					{
						// move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0 ;
						continue ;
					}
					else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConficted[i][k])
					{
						// move  add
						showMoveAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0 ;
						score += board[i][k] ;
						updateScore(score);
						hasConficted[i][k] = true ;
						continue ;
					}
				}
			}
		}
	setTimeout(function(){
        updateBoardView()
    },200);
	return true ;
}


function moveRight(board){
	if(!canMoveRight(board))
		return false ;

	for(var i = 0 ; i < 4 ; i++ )
		for(var j = 2 ; j >= 0 ; j-- )
		{
			if(board[i][j] != 0)
			{
				for(var k = 3 ; k > j ; k--)
				{
					if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board))
					{
						// move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0 ;
						continue ;
					}
					else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConficted[i][k])
					{
						// move  add
						showMoveAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0 ;
						score += board[i][k] ;
						updateScore(score);
						hasConficted[i][k] = true ;
						continue ;
					}
				}
			}
		}
		setTimeout(function(){
        updateBoardView()
    },200);
	return true ;
}

function moveUp(board){
	if(!canMoveUp(board))
		return false ;

	for(var j = 0 ; j < 4 ; j++ )
		for(var i = 1 ; i < 4 ; i++ )
		{
			if(board[i][j] != 0)
			{
				for(var k = 0 ; k < i ; k++)
				{
					if(board[k][j] == 0 && noBlockVertical(j,i,k,board))
					{
						// move
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0 ;
						continue ;
					}
					else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConficted[k][j])
					{
						// move  add
						showMoveAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0 ;
						score += board[k][j] ;
						updateScore(score);
						hasConficted[k][j] = true ;
						continue ;
					}
				}
			}
		}
		setTimeout(function(){
        updateBoardView()
    },200);
	return true ;
}

function moveDown(board){
	if(!canMoveDown(board))
		return false ;

	for(var j = 0 ; j < 4 ; j++ )
		for(var i = 2 ; i >= 0 ; i-- )
		{
			if(board[i][j] != 0)
			{
				for(var k = 3 ; k > i ; k--)
				{
					if(board[k][j] == 0 && noBlockHorizontal(j,i,k,board))
					{
						// move
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0 ;
						continue ;
					}
					else if(board[k][j] == board[i][j] && noBlockHorizontal(j,i,k,board) && !hasConficted[k][j])
					{
						// move  add
						showMoveAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0 ;
						score += board[k][j] ;
						updateScore(score);
						hasConficted[k][j] = true ;
						continue ;
					}
				}
			}
		}
	setTimeout(function(){
        updateBoardView()
    },200);
	return true ;
}

function isgameover()
{
	if(nospace(board) && nomove(board))
	{
		gameover();
	}
}

function gameover(){
	alert("game over!");
}


  }
};
</script>

<style lang="less" scoped>
@import url("../assets/css/2048.css");
</style>