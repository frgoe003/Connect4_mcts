export default function PlayerStats(ctx, player, canvas) {
    // Name
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Name: ${player.name}`, 15, 30);
  
    // Lives
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    var gap = 0;
    for (let i = 0; i < player.lives; i++) {
      ctx.fillText("❤️", canvas.width -35 - gap , 30);
      gap += 30;
    }

    // Score
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${player.score}`, 15, canvas.height-20);

    // Clicks
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    var gap = 0;
    for (let i = 0; i<player.clicks.toString().length; i++) {
      ctx.fillText(`taps: ${player.clicks}`, canvas.width - 90 -gap, canvas.height-20);
      gap+=30;
    }
  }