import styled from "styled-components";
import IconBtn from "../iconbtn/iconbtn";
import {Input} from "antd";

export const Search = styled.div`
    width: 100%;
    display: flex;
    
`;

export const SearchInput = styled(Input)`
    width: 100%;
    border:0px;
    padding: 10px;
    border-bottom: 1px solid rgba(0,0,0,.3);
    margin: 10px;
    height: 40px;
    outline: none;
`;

export const SeachIcon = styled.div`
    padding: 20px 10px 10px;
`;

export const SearchFriend = styled.div`
    font-size: 12px;
    text-align: center;
    color: #b5b5b5;
    width: 100%;
    background: rgba(0,0,0,0.1);
    height:20px;
    margin-bottom: 10px;
`;