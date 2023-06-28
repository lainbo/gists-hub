yq = 3 -- 这是压枪开关对应的侧键
down = {5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3} --向下压枪 这里有20个数值
-- 想往下压幅度大一点一点就改大这里面的数值，或者在后面添加数值 改小反之
ZY = {-3, -3, -3, -3, -4, -4, -4, -4, -4, -4, 5, 5, 5, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3} --向左右压枪

yaqiang = false --压枪开关判断

function OnEvent(event, arg)
    if event == "MOUSE_BUTTON_PRESSED" and arg == yq then
        --上面判断语句是鼠标被按压且按压的键是yq，yq也就是3
        yaqiang = not yaqiang --这里 false = not false 即变成true 当再次按下就再次变成 false 实现开关功能
    end
    if yaqiang then
        i = 1 --从第一个数开始
        z = 1
        if event == "MOUSE_BUTTON_PRESSED" and arg == 1 then
            Sleep(math.random(105, 115))
            while (IsMouseButtonPressed(1)) do --当鼠标左键被按压时执行的循环

                MoveMouseRelative(0, down[i]) --向下移动20个数值
                i = i + 1 --执行完这个下压，当大于的时候将会是nil将不会再移动，当i大于20就会是nil
                if i>20 then -- i>20 表示向下压完成了
                    MoveMouseRelative(ZY[z], 0)
                    z = z + 1
                end
                Sleep(math.random(25, 35)) --下压延时

            end
        end
    end
end
