//星座定义
const constellations = [
    {"Start":121,"End":220,"Name":"水平座"},    {"Start":221,"End":320,"Name":"双鱼座"},
    {"Start":321,"End":420,"Name":"白羊座"},    {"Start":421,"End":520,"Name":"金牛座"},
    {"Start":521,"End":620,"Name":"双子座"},    {"Start":621,"End":720,"Name":"巨蟹座"},
    {"Start":721,"End":820,"Name":"狮子座"},    {"Start":821,"End":920,"Name":"处女座"},
    {"Start":921,"End":1020,"Name":"天秤座"},       {"Start":1021,"End":1120,"Name":"天蝎座"},
    {"Start":1121,"End":1220,"Name":"射手座"}    ];

/**
 * @return {string}
 */
export function WhatIsYourConstellation(y,m,d)
{
    /*
    判断日期有效性
    1,3,5,7,8,10,12为31天
    2月润年29，非润年28
    4,6,9,11为30天
    */
    var daysInMonth = [31,99,31,30,31,30,31,31,30,31,30,31];

    //检测年份
    if(y < 1970 || y > 2099) return "滚犊子1";

    //检测月份
    if(m < 1 || m > 12) return "滚犊子2";

    //检测日期
    var mDays = daysInMonth[m-1];
    //如果是二月，要根据年份计算天数，不是二月时略过此计算
    if(m === 2)
    {
        mDays = GetSpecialDays(y)
    }

    //判断日数据是不是在月份的有效天范围
    if(d < 0 || d > mDays)  return "滚犊子3";

    //好了，走到这一步，说明上面的验证都TM过了。
    //这才判断是哪一个星座
    //星座座标等于m*100 + d
    var pos = m * 100 + d;

    for(var i in constellations)
    {
        if(pos >= constellations[i].Start && pos <= constellations[i].End)
        {
            return constellations[i].Name;
        }
    }
}
//根据年份计算二月天数
/**
 * @return {number}
 */
function GetSpecialDays(y)
{
    if (y % 400 === 0 || (y % 4 === 0 && y % 100 !== 0)) return 29;
    return 28;
}