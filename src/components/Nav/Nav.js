import React, { Component } from 'react';
import { Motion, StaggeredMotion, spring } from 'react-motion';
import range from 'lodash.range';

// CONSTANTS

// Diameter of the main button in px
const MAIN_BUBBLE_DIAM = 50;
const CHILD_BUBBLE_DIAM = 45;

// Number of bubbles that fly out from main bubble
const NUM_CHILDREN = 7;

// Hard code the position values of the mainBubble
const M_X = 10;
const M_Y = 10;

// This should be between 0 and 0.5 (its max val is the diff between scale in finalChildBubbleStyles and startChildBubbleStyles)
const OFFSET = 0.05;

const SPRING_CONFIG = { stiffness: 400, damping: 28 };

// How far away from main bubble do children bubbles go
const FLY_OUT_RADIUS = 60,
    SEPARATION_ANGLE = 15, //degrees
    FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE, //degrees
    BASE_ANGLE = ((90 - FAN_ANGLE) / 2); //degrees

// Names of icons for each bubble from fontAwesome
let childBubbleIcons = ['exclamation-circle', 'medal', 'tasks', 'sign-in-alt', 'bars', 'image', 'home'];

// Utility Functions

function toRadians(degrees) {
    return degrees * (Math.PI / 90)
}

function finalChildDeltaPositions(index) {
    let angle = BASE_ANGLE + (index * SEPARATION_ANGLE);
    return {
        deltaX: FLY_OUT_RADIUS * Math.cos(toRadians(angle)) - (CHILD_BUBBLE_DIAM / 2),
        deltaY: FLY_OUT_RADIUS * Math.sin(toRadians(angle)) + (CHILD_BUBBLE_DIAM / 2)
    }
}

class Nav extends Component {
    constructor(props){
        super(props)

        this.state = {
            isOpen: false,
            childButtons: []
        }
    }

    componentDidMount(){
        window.addEventListener('click', this.closeMenu);
        let childBubbles = [];

        this.setState({ childBubbles: childBubbles.slice(0) })
    }

    componentWillUnmount(){
        window.removeEventListener('click', this.closeMenu);
    }

    mainBubbleStyles(){
        return {
            width: MAIN_BUBBLE_DIAM,
            height: MAIN_BUBBLE_DIAM,
            top: M_Y - (MAIN_BUBBLE_DIAM / 2),
            right: M_X - (MAIN_BUBBLE_DIAM / 2)
        }
    }

    initialChildBubbleStyles(){
        return {
            width: CHILD_BUBBLE_DIAM,
            height: CHILD_BUBBLE_DIAM,
            top: spring(M_Y - (CHILD_BUBBLE_DIAM / 2), SPRING_CONFIG),
            right: spring(M_X - (CHILD_BUBBLE_DIAM / 2), SPRING_CONFIG),
            rotate: spring(-90, SPRING_CONFIG),
            scale: spring(0.5, SPRING_CONFIG)
        }
    }

    initialChildBubbleStylesInit(childIndex){
        let { deltaX, deltaY } = finalChildDeltaPositions(childIndex);
        return {
            width: CHILD_BUBBLE_DIAM,
            height: CHILD_BUBBLE_DIAM,
            top: M_Y - deltaY,
            right: M_X + deltaX,
            rotate: 0,
            scale: 1
        }
    }

    finalChildBubbleStyles(childIndex){
        let { deltaX, deltaY } = finalChildDeltaPositions(childIndex);
        return {
            width: CHILD_BUBBLE_DIAM,
            height: CHILD_BUBBLE_DIAM,
            top: spring(M_Y - deltaY, SPRING_CONFIG),
            right: spring(M_X + deltaX, SPRING_CONFIG),
            rotate: spring(0, SPRING_CONFIG),
            scale: spring(1, SPRING_CONFIG)
        }
    }

    toggleMenu = (e) => {
        e.stopPropagation();
        let { isOpen } = this.state;
        this.setState({ isOpen: !isOpen })
    }

    closeMenu = () => {
        this.setState({ isOpen: false })
    }

    renderChildBubbles(){
        const { isOpen } = this.state;
        const targetBubbleStylesInitObject = range(NUM_CHILDREN).map( i => {
            return isOpen ? this.finalChildBubbleStylesInit(i) : this.initialChildBubbleStylesInit();
        })

        // StaggeredMotion now takes an Array of Objects
        const targetBubbleStylesInit = Object.keys(targetBubbleStylesInitObject).map( key => targetBubbleStylesInitObject[key] );

        const targetBubbleStyles = range(NUM_CHILDREN).map( i => {
            return isOpen ? this.finalChildBubbleStyles(i) : this.initialChildBubbleStyles();
        });

        const scaleMin = this.initialChildBubbleStyles().scale.val;
        const scaleMax = this.finalChildBubbleStyles(0).scale.val;

        //This function returns target styles for each child button in current animation frame
    //according to actual styles in previous animation frame.
    //Each button could have one of two target styles
    // - defined in initialChildButtonStyles (for collapsed buttons)
    // - defined in finalChildButtonStyles (for expanded buttons)
    // To decide which target style should be applied function uses css 'scale' property
    // for previous button in previous animation frame.
    // When 'scale' for previous button passes some 'border' which is a simple combination one of
    // two 'scale' values and some OFFSET the target style for next button should be changed.
    //
    // For example let's set the OFFSET for 0.3 - it this case border's value for closed buttons will be 0.8.
    //
    // All buttons are closed
    //                INITIAL-BUTTON-SCALE-(0.5)-----------BORDER-(0.8)------FINAL-BUTTON-SCALE-(1)
    //                |------------------------------------------|--------------------------------|
    // BUTTON NO 1    o------------------------------------------|---------------------------------
    // BUTTON NO 2    o------------------------------------------|---------------------------------
    //
    // When user clicks on menu button no 1 changes its target style according to finalChildButtonStyles method
    // and starts growing up. In this frame this button doesn't pass the border so target style for button no 2
    // stays as it was in previous animation frame
    // BUTTON NO 1    -----------------------------------o-------|---------------------------------
    // BUTTON NO 2    o------------------------------------------|---------------------------------
    //
    //
    //
    // (...few frames later)
    // In previous frame button no 1 passes the border so target style for button no 2 could be changed.
    // BUTTON NO 1    -------------------------------------------|-o-------------------------------
    // BUTTON NO 2    -----o-------------------------------------|---------------------------------
    //
    //
    // All buttons are expanded - in this case border value is 0.7 (OFFSET = 0.3)
    //                INITIAL-BUTTON-SCALE-(0.5)---BORDER-(0.7)--------------FINAL-BUTTON-SCALE-(1)
    //                |------------------------------|--------------------------------------------|
    // BUTTON NO 1    -------------------------------|--------------------------------------------O
    // BUTTON NO 2    -------------------------------|--------------------------------------------O
    //
    // When user clicks on menu button no 1 changes its target style according to initialChildButtonStyles method
    // and starts shrinking down. In this frame this button doesn't pass the border so target style for button no 2
    // stays as it was defined in finalChildButtonStyles method
    // BUTTON NO 1    -------------------------------|------------------------------------O--------
    // BUTTON NO 2    -------------------------------|--------------------------------------------O
    //
    //
    //
    // (...few frames later)
    // In previous frame button no 1 passes the border so target style for button no 2 could be changed
    // and this button starts to animate to its default state.
    // BUTTON NO 1    -----------------------------o-|---------------------------------------------
    // BUTTON NO 2    -------------------------------|------------------------------------O--------

    let calculateStylesForNextFrame = prevFrameStyles => {
        prevFrameStyles = isOpen ? prevFrameStyles : prevFrameStyles.reverse();

        let nextFrameTargetStyles = prevFrameStyles.map( (bubbleStyleInPreviousFrame, i) => {
            if ( i === 0 ){
                return targetBubbleStyles[i];
            }

            const prevBubbleScale = prevFrameStyles[ i - 1 ].scale;
            const shouldApplyTargetStyle = () => {
                if (isOpen){
                    return prevBubbleScale >= scaleMin + OFFSET;
                } else {
                    return prevBubbleScale <= scaleMax - OFFSET;
                }
            }

            return shouldApplyTargetStyle() ? targetBubbleStyles[i] : bubbleStyleInPreviousFrame;
        })

        return(
            <StaggeredMotion 
                defaultStyles={targetBubbleStylesInit}
                styles={calculateStylesForNextFrame}
            >
                {interpolateStyles =>
                    <div>
                        {interpolateStyles.map(({height, right, rotate, scale, top, width}, index) =>
                            <div
                                className="child-bubble"
                                key={index}
                                style={{
                                    right,
                                    height,
                                    top,
                                    transform: `rotate(${rotate}deg) scale(${scale})`,
                                    width
                                }}
                            >
                                <i className={"fa fa-" + childBubbleIcons[index] + "fa-lg"}></i>
                            </div>
                        )}
                    </div>
                }
            </StaggeredMotion>
        )
    }
    }


    render() {
        let { isOpen } = this.state;
        let mainButtonRotation = 
            isOpen ? { rotate: spring(0, { stiffness: 500, damping: 30 }) } : { rotate: spring(-135, { stiffness: 500, damping: 30 }) }
        return (
            <div className="Nav">
                {this.renderChildBubbles()}
                <Motion style={mainButtonRotation}>
					{({rotate}) =>
						<div
							className="main-button"
							style={{...this.mainBubbleStyles(), transform: `rotate(${rotate}deg)`}}
							onClick={this.toggleMenu}>
							{/*Using fa-close instead of fa-plus because fa-plus doesn't center properly*/}
							<i className="fa fa-close fa-3x"/>
						</div>
					}
				</Motion>
            </div>
        );
    }
}

export default Nav;
