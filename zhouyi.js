function zhouYi(sixYao){  //参数sixYao为只含6、7、8、9的六项数组
	var benGua = new Array()  //本卦数组，用于以6、7、8、9的数字形式存储本卦
	var drawBenGua = new Array()  //以0,1形式保存本卦的阴阳，用于绘制卦象及判断卦名
	var drawZhiGua = new Array()  //用阴阳的形式保存之卦，用于绘制卦象及判断卦名
	var sumBian = 0  //记录变爻的数量
	var bianIndex = new Array()
	var buBianIndex = new Array()
	var massage = new Object()  // 返回对象
	if (sixYao) {
		benGua = sixYao
	}else{
		//生成本卦，随机为6、7、8、9的6爻
		for (var i = 0; i < 6; i++) {
			benGua.push(Math.round(Math.random()*3+6))
		}
	}
	//变卦
	for (var i = 0; i < benGua.length; i++) {
		drawBenGua[i] = isYang(benGua[i])
		if (benGua[i] == 6 || benGua[i] == 9 ) {
			sumBian++
			drawZhiGua[i] = isYang(benGua[i])?0:1
			bianIndex.push(i)
		}else{
			drawZhiGua[i] = isYang(benGua[i])
			buBianIndex.push(i)
		}
	}
	switch(sumBian){
		case 0:
		massage.content = data[getGuaIndex(drawBenGua)].guaCi
		break
		case 1:
		massage.content = data[getGuaIndex(drawBenGua)].yaoCi[bianIndex[0]]
		break
		case 2:
		massage.content = data[getGuaIndex(drawBenGua)].yaoCi[bianIndex[0]]
		break
		case 3:
		massage.content = data[getGuaIndex(drawBenGua)].guaCi+"<br><br>"+data[getGuaIndex(drawZhiGua)].guaCi
		break
		case 4:
		massage.content = data[getGuaIndex(drawZhiGua)].yaoCi[buBianIndex[1]]
		break
		case 5:
		massage.content = data[getGuaIndex(drawZhiGua)].yaoCi[buBianIndex[0]]
		break
		case 6:
		if (drawBenGua.toString() == "1,1,1,1,1,1") {
			massage.content = data[0].yaoCi[6]
		}else if(drawBenGua.toString() == "0,0,0,0,0,0"){
			massage.content = data[1].yaoCi[6]
		}else{
			massage.content = data[getGuaIndex(drawZhiGua)].guaCi
		}
		break
	}
	massage.benGua = benGua  //返回对象中加入本卦数组
	massage.drawBenGua = drawBenGua  //返回对象中加入本卦阴阳数据，用于绘制卦象
	massage.drawZhiGua = drawZhiGua  //返回对象中加入之卦阴阳数据，用于绘制卦象
	massage.benGuaName = getGuaName(drawBenGua)  //本卦卦名
	massage.zhiGuaName = getGuaName(drawZhiGua)  //之卦卦名
	massage.sumBian = sumBian
	massage.bianIndex = bianIndex
	return massage
}
function isYang(yao){
	//判断爻为阴还是阳，阴返回0，阳返回1
	if(yao % 2 == 0){
		return 0
	}else{
		return 1
	}
}
function getGuaIndex(drawGua){
	for (var i = 0; i < data.length; i++) {
		if( data[i].yinYang.toString() == drawGua.toString() ){
			return i
		}else{
			continue
		}
		return false
	}
}
function getGuaName(drawGua){
	var guaIndex = getGuaIndex(drawGua)
	return data[guaIndex].guaName
}