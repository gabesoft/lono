import * as React from 'react';

type Props = {
  text: string
}

const getInitials = (text: string=''): string => {
  const words = text
          .replace(/\W/g, ' ')
          .split(/\s+/)
          .filter(Boolean);

  if (words.length === 0) {
    return '- -';
  } else if (words.length === 1) {
    return words[0][0] + (words[0][1] || '_');
  } else {
    return words[0][0] + words[1][0];
  }
}

const Avatar = (props: Props) => {
  const initials = getInitials(props.text);

  return (
    <div className="avatar">
      {initials}
    </div>
  );
}

export default Avatar;
