import React, { Fragment, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Box from '@material-ui/core/Box';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const TreeItem = ({ onSelectCallback, label, isSelected, children }) => {
  const [isOpen, toggleItemOpen] = useState(null);
  const [selected, setSelected] = useState(isSelected);

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <StyledTreeItem>
        {children.length > 0 && (
          <Box
            className="icon-container"
            onClick={() => toggleItemOpen(!isOpen)}
          >
            {isOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </Box>
        )}
        <StyledLabel
          className="label"
          onClick={(e) => {
            setSelected(!selected);
            onSelectCallback(e);
          }}
          style={{
            marginLeft: `${children.length === 0 ? '24px' : ''}`,
            background: `${selected ? '#d5d5d5' : ''}`,
          }}
        >
          {/* <Box> {label} </Box> */}

          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="recipe"
                  className={classes.avatar}
                  src={label.avatar}
                ></Avatar>
              }
              title={label.name}
            />

            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {label.text}
              </Typography>
            </CardContent>
          </Card>
        </StyledLabel>
      </StyledTreeItem>
      <StyledTreeChildren>{isOpen && children}</StyledTreeChildren>
    </div>
  );
};

const RecursiveTree = ({ listMeta, onSelectCallback }) => {
  const createTree = (branch) =>
    branch.text && (
      <TreeItem
        id={branch.text}
        key={branch.text}
        onSelectCallback={(e) => {
          onSelectCallback(branch);
        }}
        isSelected={branch.selected}
        label={{
          name: branch.author.name,
          avatar: branch.author.avatar,
          text: branch.text,
        }}
      >
        {branch.replies ? (
          branch.replies.map((branch) => {
            return <Fragment key={branch.text}>{createTree(branch)}</Fragment>;
          })
        ) : (
          <Fragment key={branch.text}>{}</Fragment>
        )}
      </TreeItem>
    );

  return (
    <Box>
      {listMeta?.map((branch, i) => (
        <Box key={i}>{createTree(branch)}</Box>
      ))}
    </Box>
  );
};

export default RecursiveTree;

// styles

const StyledLabel = styled(Box)({
  height: 'auto',
  '&:hover': {
    cursor: 'pointer',
  },
});
const StyledTreeItem = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  borderLeft: 'solid black 2px',
});
const StyledTreeChildren = styled(Box)({
  paddingLeft: '10px',
  borderLeft: 'solid black 2px',
});
