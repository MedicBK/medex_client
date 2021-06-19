import React from 'react';
import {FormControlLabel, makeStyles, Typography} from '@material-ui/core';
import {CardItemsViewProps} from './CardItemsViewProps';
import CheckIcon from '@material-ui/icons/Check';
import {AnalizeTypeEnum} from './AnalizeResponse';
import {blue, green, grey, red} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    item: {
        display: 'flex',
    },
    itemText: {
        marginLeft: theme.spacing(1),
    },
}));

const CardItemsView: React.FC<CardItemsViewProps> = ({items, type}: CardItemsViewProps) => {
    const classes = useStyles();

    const getIcon = (type: AnalizeTypeEnum | undefined, checked: boolean): any => {
        const color = getColor(type, checked);
        let icon;

        switch (type) {
            case AnalizeTypeEnum.DRUGS:
                icon = <CheckIcon style={{ color: color }} />;
                break;
            case AnalizeTypeEnum.EXAMS:
                icon = <CheckIcon style={{ color: color }} />;
                break;
            case AnalizeTypeEnum.STANDARD:
                icon = <CheckIcon style={{ color: color }} />;
                break;

            default:
                icon = <CheckIcon style={{ color: color }} />;
                break;
        }

        return icon;
    }

    const getColor = (type: AnalizeTypeEnum | undefined, checked: boolean): any => {
        let color;
        switch (type) {
            case AnalizeTypeEnum.DRUGS:
                color = checked ? blue[700] : grey[500];
                break;
            case AnalizeTypeEnum.EXAMS:
            case AnalizeTypeEnum.STANDARD:
                color = checked ? green[700] : red[700];
                break;

            default:
                color = grey[500];
                break;
        }
        return color;
    }

    return (
            <React.Fragment>
                {items?.map((item, index) => {
                    return (
                        <FormControlLabel
                            key={index}
                            className={classes.item}
                            control={
                                getIcon(type, item.checked)
                            }
                            label={
                                <Typography className={classes.itemText}>{item.text}</Typography>
                            }
                        />
                    );
                })
                }
            </React.Fragment>
    );
}

export default CardItemsView;
