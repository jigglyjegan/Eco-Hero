<template>
        <nav>

        <label for="drop" class="toggle">Menu</label>
        <input type="checkbox" id="drop" />
            <ul class="menu">
                <div id="notLogged" v-if= "!user">
                <!-- Not logged in -->
                    <div class="nav">
                        <li><router-link to="/registration"> Sign Up </router-link></li>  
                        <li><router-link to="/login"> Login </router-link> </li> 
                        <li><router-link to="/contactUs">Contact Us</router-link> </li> 
                        <li><router-link to="/forgetPass" v-if="!user"> Forget Password </router-link></li>
                    </div>
                </div>

                <div id="logged" v-if= "user">
                    <div class="nav">
                          <li><p id="user" v-if="user" class="name">
                        {{user.displayName}}
                        </p></li>
                        <li><div class="account">
                            <Dropdown title = "Account Settings" :items="account"/> 
                        </div></li>
                        <li><router-link to="/"> Home </router-link> </li>
                        <li><router-link to="/overview"> Overview </router-link></li>
                        <li><router-link to="/about">About</router-link></li>
                        <li><router-link to="/data"> Data </router-link></li>
                          <li><div class="reports">
                            <ReportsDropdown title = "Reports" :items="account"/> 
                        </div></li>
                      
                    </div>
                </div>

                 <ul class="menu">
                    <!-- First Tier Drop Down -->
                    <li>
                        <label for="drop-1" class="toggle">Reports +</label>
                        <a href="#">Reports</a>
                        <input type="checkbox" id="drop-1"/>
                        <ul>
                            <li><a href="#">Department</a></li>
                            <li><a href="#">Company</a></li>
                        </ul> 

                    </li>
                </ul>
            </ul>
        </nav>

        <!--  <p> A simple dropdown navigation menu made with CSS Only. Dropdowns are marked with a plus sign ( + )</p>
        <p> Resize the screen to see the look if the screen is smaller then 768px </p> -->


</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Dropdown from "@/components/Dropdown.vue"
import ReportsDropdown from "@/components/ReportsDropdown.vue"


export default {
  name: "TopBar",
  components: {
    Dropdown,
    ReportsDropdown

  },

  data() {
    return {
      user: false,
       account:[
        {title: 'Change Password',
        },

        {title: 'Change Limit',
        },

        {title: 'Logout',        
        }
      ]
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
};
</script>

<style>
/* CSS Document */

@import url(https://fonts.googleapis.com/css?family=Open+Sans);
@import url(https://fonts.googleapis.com/css?family=Bree+Serif);

body {
	background: #212121;
	font-size:22px;
	line-height: 32px;
	color: #ffffff;
	margin: 0;
	padding: 0;
	word-wrap:break-word !important;
	font-family: 'Open Sans', sans-serif;
	}



h3 {
	font-size: 30px;
	line-height: 34px;
	text-align: center;
	color: #FFF;
}

h3 a {
	color: #FFF;
}

a {
    font-size:22px;
	color: #FFF;
}

.account {
    font-size:17px;
    color: #FFF;
    position: relative;
    right: 950px;
    top: 17px;
}

.reports {
    font-size:17px;
    color: #FFF;
    position: relative;
    top: 14px;
    margin-left: 20px;
    margin-right: 20px;
    
}

#container {
	margin: 0 auto;
	max-width: 890px;
}

.name {
    color: #FFF;
	font-size: 17px;
    position: relative;
    right: 1000px;
    
}

.toggle,
[id^=drop] {
	display: none;
}

/* Giving a background-color to the nav container. */
nav { 
	margin:0;
	padding: 0;
	background-color: #254441;
}

#logo {
	display: block;
	padding: 0 30px;
	float: left;
	font-size:20px;
	line-height: 60px;
}

/* Since we'll have the "ul li" "float:left"
 * we need to add a clear after the container. */

nav:after {
	content:"";
	display:table;
	clear:both;
}

/* Removing padding, margin and "list-style" from the "ul",
 * and adding "position:reltive" */
nav ul {
	float: right;
	padding:0;
	margin:0;
	list-style: none;
	position: relative;
	}
	
/* Positioning the navigation items inline */
nav ul li {
	margin: 0px;
	display:inline-block;
	float: left;
	background-color: #254441;
	}

/* Styling the links */
nav a {
	display:block;
	padding:14px 20px;	
	color:#FFF;
	font-size:17px;
	text-decoration:none;
}


nav ul li ul li:hover { background: #000000; }


/* Background color change on Hover */
nav a:hover { 
	background-color: #000000; 
}

/* Hide Dropdowns by Default
 * and giving it a position of absolute */
nav ul ul {
	display: none;
	position: absolute;
	/* has to be the same number as the "line-height" of "nav a" */
	top: 60px; 
}
	
/* Display Dropdowns on Hover */
nav ul li:hover > ul {
	display:inherit;
    overflow: auto;
}
	
/* Fisrt Tier Dropdown */
nav ul ul li {
	width:170px;
	float:none;
	display:list-item;
	position: relative;
}

/* Second, Third and more Tiers	
 * We move the 2nd and 3rd etc tier dropdowns to the left
 * by the amount of the width of the first tier.
*/
nav ul ul ul li {
	position: relative;
	top:-60px;
	/* has to be the same number as the "width" of "nav ul ul li" */ 
	left:170px; 
}

	
/* Change ' +' in order to change the Dropdown symbol */
li > a:after { content:  ' +'; }
li > a:only-child:after { content: ''; }


/* Media Queries
--------------------------------------------- */

@media all and (max-width : 768px) {

	#logo {
		display: block;
		padding: 0;
		width: 100%;
		text-align: center;
		float: none;
	}

	nav {
		margin: 0;
	}

	/* Hide the navigation menu by default */
	/* Also hide the  */
	.toggle + a,
	.menu {
		display: none;
	}

	/* Stylinf the toggle lable */
	.toggle {
		display: block;
		background-color: #254441;
		padding:14px 20px;	
		color:#FFF;
		font-size:17px;
		text-decoration:none;
		border:none;
	}

	.toggle:hover {
		background-color: #000000;
	}

	/* Display Dropdown when clicked on Parent Lable */
	[id^=drop]:checked + ul {
		display: block;
        overflow: visible;
	}

	/* Change menu item's width to 100% */
	nav ul li {
		display: block;
		width: 100%;
		}

	nav ul ul .toggle,
	nav ul ul a {
		padding: 0 40px;
	}

	nav ul ul ul a {
		padding: 0 80px;
	}

	nav a:hover,nav ul ul ul a {
		background-color: #000000;
	}
  
	nav ul li ul li .toggle,
	nav ul ul a,
  nav ul ul ul a{
		padding:14px 20px;	
		color:#FFF;
		font-size:17px; 
	}
  
  
	nav ul li ul li .toggle,
	nav ul ul a {
		background-color: #212121; 
	}

	/* Hide Dropdowns by Default */
	nav ul ul {
		float: none;
		position:static;
		color: #ffffff;
		/* has to be the same number as the "line-height" of "nav a" */
	}
		
	/* Hide menus on hover */
	nav ul ul li:hover > ul,
	nav ul li:hover > ul {
		display: none;
	}
		
	/* Fisrt Tier Dropdown */
	nav ul ul li {
		display: block;
		width: 100%;
	}

	nav ul ul ul li {
		position: static;
		/* has to be the same number as the "width" of "nav ul ul li" */ 

	}

}

@media all and (max-width : 330px) {

	nav ul li {
		display:block;
		width: 94%;
	}

}
</style>
