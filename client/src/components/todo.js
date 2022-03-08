import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import { connect } from "react-redux";
import { add, update, findAll, more, complete } from "../actions/todo";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';

class Todo extends Component {
    state = {
        title: '',
        description: ''
    }

    componentDidMount() {
        this.props.findAll();
    }

    handleText(e) {
        this.setState({
            title: e.target.value
        })
    }

    handleDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    add() {
        this.props.add({
            title: this.state.title,
            description: this.state.description
        });
    }

    more(todo) {
        this.props.more(todo);
    }

    complete(todo) {
        this.props.complete(todo);
    }

    render() {
        return (
            <Container>
                <Box sx={{ bgcolor: "#fafafa", px: 6, py: 2, minHeight: "100vh" }}>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Stack spacing={2} sx={{ pt: 2 }}>
                            <TextField id="outlined-basic" label="Title" variant="outlined" color="primary" focused onChange={this.handleText.bind(this)} required />
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder="Description"
                                style={{ width: 400, height: 100 }}
                                onChange={this.handleDescription.bind(this)}
                            />
                            <Button variant="contained" onClick={this.add.bind(this)}> Add </Button>
                        </Stack>
                    </Grid>
                    <List sx={{ width: '100%' }} component="nav" aria-label="mailbox folders">
                        {
                            this.props.todos.map((todo, i) => {
                                return (
                                    <div key={todo.id}>
                                        <ListItem sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                            <ListItemText>{todo.title}</ListItemText>
                                            <Box mr={2}>
                                                <Button variant="contained" onClick={this.more.bind(this, todo)}> More </Button>
                                            </Box>
                                            <Box justifyContent="flex-end">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox checked={todo.completed} onChange={this.complete.bind(this, todo)} />
                                                    }
                                                    label=""
                                                />
                                            </Box>
                                        </ListItem>
                                        <Grid item xs={12} sm={12}>
                                            {
                                                todo.more && <Box sx={{ display: 'flex' }}>
                                                    <TextareaAutosize
                                                        aria-label="empty textarea"
                                                        placeholder="Description"
                                                        style={{ width: 400, height: 100 }}
                                                        defaultValue={todo.description}
                                                        onChange={this.handleDescription.bind(this)}
                                                    />
                                                </Box>
                                            }
                                        </Grid>
                                        {i !== this.props.todos.length - 1 && <Divider />}
                                    </div>
                                );
                            })
                        }
                    </List>
                </Box>
            </Container >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todo.data,
    };
};

export default connect(mapStateToProps, { add, update, findAll, more, complete })(Todo);