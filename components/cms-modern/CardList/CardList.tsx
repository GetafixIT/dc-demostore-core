// Generated with util/create-component.js
import React from "react";
import { Grid, CardContent, Typography, Card as MuiCard, CardActions, Button, Box } from '@mui/material';
import { CmsContent } from '@lib/cms/CmsContent';
import { withStyles, WithStyles } from '@mui/styles'
import { Theme } from '@mui/material';
import Card from '../Card'
import CardIcon from '../CardIcon'


const styles = (theme: Theme) => ({
    root: { marginTop: 30, marginBottom: 30 }
});

interface CardListProps extends WithStyles<typeof styles> {
    className?: string;
    header?: string;
    align?: 'left' | 'right' | 'center';
    cards?: CmsContent[];
}

const CardList: React.FC<CardListProps> = ({
  header,
  align = 'left',
  cards = [],
  classes
}) => {

  const cardsList = cards.map((item) => {
    return item._meta.schema.indexOf('card-icon') > -1 ? {...item, component: CardIcon} : {...item, component: Card}
  })

  return (
      <Box data-testid="CardList" className={classes.root}>
      {
          header && (
              <Typography variant="h2" component="h2" align={align}>
                  {header}
              </Typography>
          )
      }
      {
          cards && (
              <Grid style={{justifyContent: 'space-between'}} container>
                  {
                    cardsList.map((card: any, index: number) => {
                          const Comp = card.component;
                          return <Comp key={ Math.random().toString(36).substr(2, 9) } {...card} />
                      })
                  }
              </Grid>
          )
      }
      </Box>
  )
};

export default withStyles(styles)(CardList);
