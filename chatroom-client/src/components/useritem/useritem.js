import styled from "styled-components";

export const Item = styled.div`
    padding: 10px;
    height:70px;
    width:100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid rgba(100, 100, 190, 0.1);
`;

export const ItemTitle = styled.div`
  height:50px;
  display: flex;
  font-size: ${props=>props.size?props.size:10};
  font-weight: ${props=>props.size?props.weight:100};
  align-items: center;
  width: fit-content;
  white-space: nowrap;
`;

export const ItemUserHeader =  styled.div`
    height: 50px;
    width:50px;
    display: flex;
    align-items: center;
`;

export const ItemUserInformation = styled.div`
    margin-left: 10px;
    width:100%;
    
    input{
      width: 100%;
      padding:5px;
      padding-left: 15px;
      outline: none;
      border:0;
      border-radius: 0;
      border-left: 1px solid rgba(0,0,100,0.1);
    }
    h5{
        margin-top: 5px;
        margin-bottom: 0px;
        font-size: 15px;
        font-weight: 600;
        color: rgba(50, 50, 100, .9);
    }
    span{
        width: 60%;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
        font-size:11px;
        color:#b5b5b5;
        margin:0px;
    }
    p{
        width: 60%;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
        font-size:11px;
        color:#b5b5b5;
        margin:0px;
    }
`;


export const ItemUnread  = styled.div`
    float: right;
    width: 24px;
    height: 20px;
    font-size: 12px;
    text-align: center;
    background: rgba(250, 100, 130, .9);
    color: white;
    border-radius: 50% 50%;
    float: right;    
`;

export const ItemOperator = styled.div`
    display: flex;
    border-radius: 5px;
    overflow: hidden;
    width: 300px;
    opacity: 0.9;
    justify-content: flex-end;
`;
