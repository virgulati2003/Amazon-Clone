import { React, useContext, useEffect, useState } from "react";
import "./Navbar.css";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { Logincontext } from "../context/ContextProvider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Drawer, IconButton, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Rightheader from "./Rightheader";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { makeStyles } from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";
const usestyle = makeStyles({
  component: {
    marginTop: 10,
    marginRight: "-50px",
    width: "300px",
    padding: 50,
    height: "300px",
  },
});
const Navbar = () => {
  const { account, setAccount } = useContext(Logincontext);
  const [dropen, setDropen] = useState(false);
  const [text, setText] = useState();
  const [liopen, setLiopen] = useState(true);
  const { products } = useSelector((state) => state.getproductsdata);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const getdetailsvaliduser = async () => {
    const res = await fetch("https://clone-backend-zo32.onrender.com/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    // console.log(data);

    if (res.status !== 201) {
      console.log("first login");
    } else {
      // console.log("cart add ho gya hain");
      setAccount(data);
    }
  };
  const classes = usestyle();
  useEffect(() => {
    getdetailsvaliduser();
  }, []);
  const handelopen = () => {
    setDropen(true);
  };
  const handleClosedr = () => {
    setDropen(false);
  };
  const logoutuser = async () => {
    const res2 = await fetch("https://clone-backend-zo32.onrender.com/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data2 = await res2.json();
    // console.log(data2);

    if (!res2.status === 201) {
      const error = new Error(res2.error);
      throw error;
    } else {
      setAccount(false);
      setOpen(false);
      toast.success("Logged Out Successfully", {
        position: "top-center",
      });
      navigate("/");
      handleClosedr();
    }
  };
  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };
  const getText = (text) => {
    setText(text);
    setLiopen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handelopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          <Drawer open={dropen} onClose={handleClosedr}>
            <Rightheader userlog={logoutuser} logclose={handleClosedr} />
          </Drawer>
          <NavLink to="/">
            <div className="navlogo">
              <img src="./amazon_PNG25.png" alt="" />
            </div>
          </NavLink>
          <div className="nav_searchbaar">
            <input onChange={(e) => getText(e.target.value)} type="text" placeholder="Search Your Product" />
            <div className="search_icon">
              <i className="fas fa-search" id="search"></i>
            </div>
            {text && (
              <List className="extrasearch" hidden={liopen}>
                {products
                  .filter((product) => product.title.longTitle.toLowerCase().includes(text.toLowerCase()))
                  .map((product) => (
                    <ListItem>
                      <NavLink to={`https://clone-backend-zo32.onrender.com/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>
        <div className="right">
          {!account ? (
            <div className="nav_btn">
              <NavLink to="/login">Sign in</NavLink>
            </div>
          ) : (
            <div></div>
          )}
          {account ? (
            <NavLink to="/buynow">
              <div className="cart_btn">
                <Badge badgeContent={account.carts.length} color="secondary">
                  <i className="fas fa-shopping-cart" id="icon"></i>
                </Badge>

                <p>Cart</p>
              </div>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <div className="cart_btn">
                <Badge badgeContent={0} color="secondary">
                  <i className="fas fa-shopping-cart" id="icon"></i>
                </Badge>
                <p>Cart</p>
              </div>
            </NavLink>
          )}
          {account ? (
            <Avatar onClick={handleClick} className="avtar2" title={account.fname.toUpperCase()}>
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar onClick={handleClick} className="avtar" />
          )}
          <div className="menu_div">
            <Menu anchorEl={open} open={Boolean(open)} onClose={handleClose}>
              {account ? (
                <MenuItem onClick={logoutuser} style={{ margin: 10 }}>
                  <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} /> Logout
                </MenuItem>
              ) : (
                <NavLink to="/login">
                <MenuItem  style={{ margin: 10,color:"black" }}>
                   Sign-In
                </MenuItem>
                </NavLink>
              )}
            </Menu>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
