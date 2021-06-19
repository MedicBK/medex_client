import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    makeStyles,
} from '@material-ui/core';
import {CardViewProps} from './CardViewProps';
import CardItemsView from './CardItemsView';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
    },
    cardContentRoot: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    cardHeader: {
    },
    cardContent: {
        paddingTop: theme.spacing(1),
    },
}));

const CardView: React.FC<CardViewProps> = ({data}: CardViewProps) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader title={data?.title} className={classes.cardHeader}>
            </CardHeader>
            <CardContent className={classes.cardContentRoot}>
                {data?.text && data?.text}
                {data?.items?.length && <CardItemsView items={data?.items} type={data?.type} />}
            </CardContent>
        </Card>
    );
}

export default CardView;
