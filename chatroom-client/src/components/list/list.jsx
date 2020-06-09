import React, { Component } from 'react'


const user={
    username:"张三",
    degree:123,
    birthdate:1998-12-11,
    gender:1,
    province:"福建",
    city:"福州",
    twon:"鼓楼",
    description:"都说啦这个人很懒"
}

const title ="更多资料"

const message={
    title:"名字",data:user.username,
    title:"等级",data:user.degree+"月光值",
    title:"出生日期",data:user.birthdate,
    title:"性别",data:user.gender===1?"男":"女",
    title:"地址",data:user.province+"-"+user.city+"-"+user.twon,
    title:"签名",data:user.description
}


class List extends Component {
    render() { 
        
        return ( 
            <div>
                <ul>
                    <li></li>
                </ul>
            </div>
         );
    }
}
 
export default List;