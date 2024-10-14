import styled from 'styled-components';

interface IIconProps {
    iconName: string;
    size?: string;
}

function Icon({ iconName, size }: IIconProps) {
    return (
        <Wrapper>
            <Span className="material-symbols-outlined" size={size} >
                {iconName}
            </Span>
        </Wrapper>
    );
}

export default Icon;

const Wrapper = styled.div`
  display: flex;
`;

type SpanType = Pick<IIconProps, 'size' | 'color'>;

const Span = styled.span<SpanType>`
  font-size: ${(props) => props.size ?? '2rem'};
`;