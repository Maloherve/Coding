const wheel = document.getElementsByClassName("wheel")[0]
const wheelContainer = wheel.children[1];
const cardCollection = wheelContainer.children;

const spacing = 1.2;            // spacing between cards
const scroll_speed = 0.001;     // How much scrolling turns the wheel
const amplitude = 300;          // Width of the wheel (/2)
const scale_on_edge = 0.8;      // Size of cards as they turn 


class Card {
    constructor(object, index, in_front){
        this._object = object;
        this._index = index;
        this._in_front = in_front;
        
        this._prev_displace = 0;
        this._prev_z_decidor;
        this._scroll_slider = bias[this._index];

        // Starting Position
        (this._in_front) ? this._object.style.zIndex = "4" : this._object.style.zIndex = "3";
        this.displace(this._scroll_slider)
    }


    set scroll_slider(new_scroll_slider) {
        // Calculate displace and set Transform
        let displace_direction = this.displace(new_scroll_slider)
        
        // Check if change in z-index
        let scroll_slider_direction = Math.sign(new_scroll_slider - this._scroll_slider)
        let z_decidor = displace_direction * scroll_slider_direction

        // console.log("Scroll : " + scroll_slider_direction + " / Displace " + displace_direction + " ---> " + z_decidor)
        if (this._prev_z_decidor * z_decidor < 0) {this.toggle_zIndex()}
        
        // Update previous values
        this._prev_z_decidor = z_decidor;
        this._scroll_slider = new_scroll_slider;
    }
    

    displace(scroll_slider_position){
        // Calculate Displace and displace
        let displace_value = amplitude * Math.sin(scroll_slider_position)
        this._object.style.transform = `translate(${displace_value}px)`
        // Determine direction of movement (helps with seperating front / back)
        let displace_direction = Math.sign( displace_value - this._prev_displace);
        this._prev_displace = displace_value;
        // Update scale
        let scale = this.determine_scale( Math.abs( Math.sin(scroll_slider_position) ) )
        this._object.style.transform += `scale( ${scale} )`

        return displace_direction
    }


    determine_scale(param){
        let scale = 0;
        if (this._in_front){
            scale = 1 - (1-scale_on_edge) * param
        }else{
            scale = scale_on_edge + (param - 1) * (1-scale_on_edge)
        }
        return scale
    }
    

    toggle_zIndex(){
        switch (this._object.style.zIndex){
            case "3":
                this._object.style.zIndex = "4";
                this._in_front = true;
                break;
            case "4":
                this._object.style.zIndex = "3";
                this._in_front = false;
                break;
        }
    }   
}


const bias = [-2 * spacing, -1 * spacing, 0, 1 * spacing, 2 * spacing]

// let myCards = [];
// for (let i=0; i < cardCollection.length; i++){
//     let newCard = new Card(cardCollection[0], 0, false)
//     myCards.push()
// }





const card1 = new Card(cardCollection[0], 0, false)
const card2 = new Card(cardCollection[1], 1, true)
const card3 = new Card(cardCollection[2], 2, true)
const card4 = new Card(cardCollection[3], 3, true)
const card5 = new Card(cardCollection[4], 4, false)

wheelContainer.addEventListener('wheel', (event) => {    
    event.preventDefault();
    card1.scroll_slider = card1._scroll_slider + (event.deltaY * scroll_speed)    
    card2.scroll_slider = card2._scroll_slider + (event.deltaY * scroll_speed)    
    card3.scroll_slider = card3._scroll_slider + (event.deltaY * scroll_speed)    
    card4.scroll_slider = card4._scroll_slider + (event.deltaY * scroll_speed)    
    card5.scroll_slider = card5._scroll_slider + (event.deltaY * scroll_speed)    
});


