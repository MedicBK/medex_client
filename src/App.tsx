import React, {useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    makeStyles,
    Paper, TextField,
    Typography
} from '@material-ui/core';
import CardView from './CardView';
import {AnalizeData, AnalizeResponse} from './AnalizeResponse';
import axios, {AxiosResponse} from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
    },
    wrapper: {
        padding: theme.spacing(2),
    },
    resultPaper: {
        padding: theme.spacing(4),
    },
    card: {
        width: '100%',
        // padding: theme.spacing(4),
    },
    cardHeader: {
        paddingBottom: 0,
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
    cardContent: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
    cardAction: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
    textarea: {
        width: '100%',
        maxWidth: '100%',
        minWidth: '100%',
    }
}));

function App() {
    const classes = useStyles();
    const [responseError, setResponseError] = useState<string | null>(null);
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState<AnalizeData[] | null>(null);

    const analize = () => {
        setResponse(null);
        setResponseError(null);

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
        };

        axios.post(`http://localhost:8080/analize`, {content: request}, {headers})
            .catch((error) => {
                if (!!error.isAxiosError && !error.response) {
                    setResponseError('Network error');
                } else {
                    // http status code
                    const code = error.response.status;
                    // response data
                    const data = error.response.data;
                    console.error('error data:', data);
                    setResponseError(`Error code: ${code}, message: ${data}`);
                }
                console.error('error:', error);
                console.error('error.status:', error.status);
            })
            .then((response: void | AxiosResponse<AnalizeResponse>) => {
                console.log('+++ response:', response);
                if (response) {
                    if (response.data.status === 'ok') {
                        const responseData: AnalizeData[] = response?.data?.data as AnalizeData[] || null;
                        setResponse(responseData);
                    }
                    if (response.data.status === 'error') {
                        const responseData: string = response?.data?.data as string;
                        setResponseError(responseData);
                    }
                }
            });
    }

    const handleChangeRequest = (event: any) => {
        setRequest(event.target.value);
    };

    return (
        <Box className={classes.root}>
            <Grid container
                  spacing={4}
                  className={classes.wrapper}
            >
                <Grid item xs={12}>
                    <Card className={classes.card}
                          variant="elevation"
                    >
                        <CardHeader title={'Текст запроса'} className={classes.cardHeader}>
                        </CardHeader>
                        <CardContent className={classes.cardContent}>
                            <TextField
                                className={classes.textarea}
                                multiline
                                rowsMax={20}
                                rows={10}
                                value={request}
                                onChange={handleChangeRequest}
                                variant="outlined"
                            />
                        </CardContent>
                        <CardActions className={classes.cardAction}>
                            <Button variant={'text'}
                                    style={{marginLeft: 'auto'}}
                                    color={'primary'}
                                    onClick={analize}>Анализ</Button>
                        </CardActions>
                    </Card>
                </Grid>

                {responseError &&
                <Grid item xs={12}>
                    <Typography color={'error'}>
                        {responseError}
                    </Typography>
                </Grid>
                }

                {response &&
                <Grid item xs={12}>
                    <Paper className={classes.resultPaper} elevation={2}>
                        <Grid container
                              spacing={4}
                              direction={'row'}
                        >
                            {response?.map((data, index) => {
                                return (
                                    <Grid item
                                          key={index}
                                          xl={6}
                                          lg={6}
                                          md={6}
                                          sm={6}
                                          xs={12}
                                    >
                                        <CardView
                                            data={data}
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Paper>
                </Grid>
                }

            </Grid>
        </Box>
    );
}

export default App;
