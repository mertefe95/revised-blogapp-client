import React, {useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { Link} from "react-router-dom";
import AuthOptions from "../utils/AuthOptions"
import { Container } from "@material-ui/core";
import { useHistory} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1 
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const sections = [
  { title: 'Technology', url: `/category/Technology` },
  { title: 'Design', url: '/category/Technology' },
  { title: 'Culture', url: '/category/Technology' },
  { title: 'Business', url: '/category/Technology' },
  { title: 'Politics', url: '/category/Technology' },
  { title: 'Opinion', url: '/category/Technology' },
  { title: 'Science', url: '/category/Technology' },
  { title: 'Health', url: '/category/Technology' },
  { title: 'Style', url: '/category/Technology' },
  { title: 'Travel', url: '/category/Technology' },
];




export default function Header(props) {
  const classes = useStyles();
  const {  title } = props;
  const history = useHistory();
  const [category, setCategory] = useState();
  const click = () => history.push("/") 
  const titleClick = () => history.push(`/category/${category}`)


  return (
    <React.Fragment className="big-header">
    <Container maxWidth="lg" >
      <Toolbar className={classes.toolbar}>
        <Button size="small" onClick={click}>View All Posts</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          <Button onClick={click}>{title}</Button>
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <AuthOptions />
      </Toolbar>
      <Toolbar component="nav" variant="dense" id="toolbar" className={classes.toolbarSecondary}>
        {sections.map((section, key) => (
          <Link
         
            key={key}
            variant="body2"
            className="header-links"
            to={`/category/${section.title}`}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
      </Container>
    </React.Fragment>
  );
}