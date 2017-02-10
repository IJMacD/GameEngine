import GameComponent from '../core/GameComponent.ts';

let DebugDrawGraphComponentCount = 0;

let	DebugDrawGraphComponentMin;
let	DebugDrawGraphComponentMax = 0;

export default class DebugDrawGraphComponent extends GameComponent {
    constructor (context, evaluate) {
        super();
        if(typeof evaluate != "function")
            evaluate = function(object){return object.x};
        this.context = context;
        this.evaluate = evaluate;
        this.values = [];
        this.valueIndex = 0;
        this.average = [];
        this.averageSize = 4;
        this.valueSize = height*this.averageSize;
        this.offsetX = 50 * DebugDrawGraphComponentCount;
        this.localMax = 0;
        this.localMaxAt = 0;
        DebugDrawGraphComponentCount++;
    }

    update (parent, delta) {
        if(DEBUG){
            var skip = this.valueIndex % this.valueSize,
                v = this.evaluate(parent,delta),
                x,
                y = height,
                scale;
            if(typeof DebugDrawGraphComponentMin == "undefined")
                DebugDrawGraphComponentMin = v;
            if(index == this.localMaxAt)
                DebugDrawGraphComponentMax = v;
            DebugDrawGraphComponentMin = Math.min(DebugDrawGraphComponentMin, v);
            DebugDrawGraphComponentMax = Math.max(DebugDrawGraphComponentMax, v);
            scale = 50 / (DebugDrawGraphComponentMax - DebugDrawGraphComponentMin);
            x = this.offsetX + (v - DebugDrawGraphComponentMin) * scale;
            this.context.strokeStyle = "#F88";
            this.context.beginPath();
            this.context.moveTo(x, y);
            var limit = (this.valueIndex > this.valueSize) ? this.valueSize-1 : this.valueIndex-1;
            for(var i = limit;i>=0;i-=this.averageSize){
                var index = (this.valueIndex > this.valueSize) ?
                        (i + skip + this.valueSize) % this.valueSize : i,
                    avgSum = 0,
                    avg,
                    val;
                for(var j = 0; j < this.averageSize; j++){
                    val = this.values[(index-j+this.valueSize)%this.valueSize];
                    avgSum += val;
                    if(val > this.localMax){
                        this.localMax = val;
                        this.localMaxAt = (index-j+this.valueSize)%this.valueSize;
                    }
                }
                avg = avgSum / this.averageSize;
                x = this.offsetX + (avg - DebugDrawGraphComponentMin) * scale;
                y--;
                this.context.lineTo(x,y);
            }
            this.context.stroke();
            this.valueIndex++;
            this.values[skip] = v;
        }
    }
}

DebugDrawGraphComponent.Velocity = function(object){return object.velocity.magnitude()};
DebugDrawGraphComponent.VelocityAngle = function(object){return object.velocity.angle()};
DebugDrawGraphComponent.Acceleration = function(){
	// var lastV = new Vector2(),
	// 	vector = new Vector2();
	// return function(object, delta){
	// 	vector.set(object.velocity).subtract(lastV).scale(1/delta);
	// 	lastV.set(object.velocity);
	// 	return vector.magnitude();
	// }
}();
DebugDrawGraphComponent.AccelerationAngle = function(){
	// var lastV = new Vector2(),
	// 	vector = new Vector2();
	// return function(object, delta){
	// 	vector.set(object.velocity).subtract(lastV).scale(1/delta);
	// 	lastV.set(object.velocity);
	// 	return vector.angle();
	// }
}();