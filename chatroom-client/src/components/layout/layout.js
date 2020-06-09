import styled from 'styled-components';
import QueueAnim from 'rc-queue-anim';

export const Layout = styled(QueueAnim)`
    width:100%;
    height:100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column; 
    min-height:500px;
    overflow: hidden;
    position: relative;
`;

export const Content = styled.div`
    height: 100%;
    width: 100%;
    
    &.horizontal{
        display:flex;
        justify-content:flex-start;
        align-item:center;
    }
    
    &.vertical{
        display:flex;
        justify-content:flex-start;
        align-item:center;
        flex-direction: column; 
    }
`;


export const Nav = styled.div`
    position: absolute;
    top:0px;
    width:100%;
    height: 50px;
    padding-right: 10px;
    padding-left: 10px;
    background-image: ${props => props.Transparent ? 'rgba(0,0,0,0)' : ' linear-gradient(45deg,rgba(210,210,250,.95),rgba(161, 161, 217, 0.95))'};
    display: flex;
    justify-content:space-between;
    align-items: center;
    
    .nav-title{
        font-weight: bold;
        font-size: 20px;
    }
    .nav-icon{
        color: rgba(18, 75, 161, 0.9);
        font-size: 20px;
        transition: all .5s linear;
        display: flex;
        justify-content: flex-end;
    }
`;

export const NavBar = styled.div`
    position: absolute;
    bottom:0px;
    width: 100%;
    height:55px;
    background-color: rgb(235, 235, 250);
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const ScrollContent = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-color: transparent transparent;
  scrollbar-track-color: transparent;
  -ms-scrollbar-track-color: transparent;
  ::-webkit-scrollbar{
    width: 3px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 1em;
    background-color: white;
  }
  ::-webkit-scrollbar-track{
    border-radius: 1em;
    background-color: rgba(50,50,50,.1);
  }
`;