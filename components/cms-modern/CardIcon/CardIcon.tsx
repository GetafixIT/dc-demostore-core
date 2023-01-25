// Generated with util/create-component.js
import React from "react";
import {CardContent, Typography, CardActions} from '@mui/material';
import {CmsContent} from '@lib/cms/CmsContent';
import {ContentBlock} from '@components/cms-modern';
import {withStyles, WithStyles} from '@mui/styles'
import {CardIconWrapper} from "@components/cms-modern/CardIcon/styles";

const styles = () => ({
  root: {},
  container: {
    border: "none"
  },
  content: {
    padding: 10
  },
  actions: {
    justifyContent: "center",
    paddingBottom: 20
  },
  links: {
    paddingLeft: 20,
    paddingRight: 20,
    color: "#fff",
    backgroundColor: "#000",
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "#000"
    }
  },
  linkText: {
    color: "#fff"
  }
});

export interface CardProps extends WithStyles<typeof styles> {
  className?: string;
  image?: CmsContent;
  cardName?: string;
  description?: string;
  links?: any[];
  backgroundColor: string;
}

const CardIcon: React.FC<CardProps> = ({
   image,
   cardName,
   description,
   links,
   classes,
   backgroundColor
 }) => {



  return (
    <CardIconWrapper color={backgroundColor}>
      <CardContent className={classes.content}>
        {
          image && (
            <ContentBlock content={image}/>
          )
        }
        {
          cardName && (
            <h2>
              {cardName}
            </h2>
          )
        }
        {
          description && (
            <Typography component="p">
              {description}
            </Typography>
          )
        }
      </CardContent>
      <CardActions className={classes.actions}>
        {
          links && links.map((link: any, i: number) => {
            if (link.label) {
              return (
                <button className={`${classes.links} cardIconButton`} onClick={() => {window.location.href = link.value;}} key={i}>
                  <Typography variant="h4" className={classes.linkText}>{link.label}</Typography>
                </button>
              )
            } else {
              return null;
            }
          })
        }
      </CardActions>
    </CardIconWrapper>
  )
};

export default withStyles(styles)(CardIcon);
