
/**
* このファイルを使って、独自の関数やブロックを定義してください。
* 詳しくはこちらを参照してください：https://minecraft.makecode.com/blocks/custom
*/

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="\uf06b" block="おにごっこ"
namespace custom {

    let wait_time = 0
    let p_direction = 0
    let hole_direction = 0
    let p_pos: Position = null
    let s_pos: Position = null
    let e_pos: Position = null
    let min_pos: Position = null
    let max_pos: Position = null
    let to_pos: Position = null

    let jail_min_pos: Position = null
    let jail_max_pos: Position = null


    //% blockId=speed
    //% block=すぴーど
    export function speed(): void {
        mobs.applyEffect(SPEED, mobs.target(LOCAL_PLAYER), 10, 2)
    }

    //% blockId=jump
    //% block="じゃんぷ"
    export function jump(): void {
        mobs.applyEffect(JUMP_BOOST, mobs.target(LOCAL_PLAYER), 10, 2)
    }

    //% blockId=spy
    //% block="スパイダー"
    export function spy(): void {
    s_pos = posCamera(-1, 0, -2).toWorld()
    to_pos = posCamera(1, 0, -4).toWorld()
    blocks.replace(
    COBWEB,
    AIR,
    s_pos,
    to_pos
    )
    loops.pause(10000)
    blocks.replace(AIR,COBWEB,s_pos,to_pos)
    }

    //% blockId=tp
    //% block="テレポート"
    export function tp(): void {
        max_pos = world(282, -55, 261)
        min_pos = world(201, -50, 233)

        jail_min_pos = world(185,-51,208)
        jail_max_pos = world(1151, 64, 1224)

        p_direction = player.getOrientation()
        // player.say(p_direction)
        if (p_direction > -45 && p_direction < 45) {
            hole_direction = 1
        } else if (p_direction >= 45 && p_direction < 135) {
            hole_direction = 2
        } else if (p_direction >= -135 && p_direction < -45) {
            hole_direction = 4
        } else {
            hole_direction = 3
        }
        // player.say(hole_direction)
        // 穴の向きをhole_direction で設定
        if (hole_direction == 1) {
            to_pos = pos(0, 1, 15)
        } else if (hole_direction == 2) {
            to_pos = pos(-15, 1, 0)
        } else if (hole_direction == 3) {
            to_pos = pos(0, 1, -15)
        } else if (hole_direction == 4) {
            to_pos = pos(15, 1, 0)
        } else {

        }
        to_pos = to_pos.toWorld()

        const playerPos = player.position();
        const playerX = playerPos.getValue(Axis.X);
        const playerZ = playerPos.getValue(Axis.Z);

        const jailMinX = jail_min_pos.getValue(Axis.X);
        const jailMinZ = jail_min_pos.getValue(Axis.Z);

        const jailMaxX = jail_max_pos.getValue(Axis.X);
        const jailMaxZ = jail_max_pos.getValue(Axis.Z);
        

        if ((to_pos.getValue(Axis.X) > min_pos.getValue(Axis.X) && to_pos.getValue(Axis.X) < max_pos.getValue(Axis.X) && (to_pos.getValue(Axis.Z) > min_pos.getValue(Axis.Z) && to_pos.getValue(Axis.Z) < max_pos.getValue(Axis.Z)))
        && !((playerX >= jailMinX && playerX <= jailMaxX) && (playerZ >= jailMinZ && playerZ <= jailMaxZ))
        ) {
            if (blocks.testForBlock(AIR, to_pos) && blocks.testForBlock(AIR, world(to_pos.getValue(Axis.X), to_pos.getValue(Axis.Y) + 1, to_pos.getValue(Axis.Z)))) {
                player.teleport(to_pos)
                player.say("tp")
            }
        } else {
            player.say("ここではつかえないよ")
        }
    }
}
