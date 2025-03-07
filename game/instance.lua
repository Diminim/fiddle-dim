local function createUUID()
    local uuid = ""
    local chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    for i = 1, 30 do
        local l = math.random(1, #chars)
        uuid = uuid .. string.sub(chars, l, l)
    end
    return uuid
end
local uuid = createUUID()

local realDir = love.filesystem.getSaveDirectory()
local instanceDir = "/ext/"..uuid.."/"
love.filesystem.createDirectory(instanceDir)


local entranceFile = "main.lua"
JS.newRequest(
    JS.stringFunc(
        [[return getEntrance()]]
    ),
    function (data)
        entranceFile = data
    end
)

local directoryItems
function stringSplit(str, sep) -- http://lua-users.org/wiki/SplitJoin
    local sep, fields = sep or ":", {}
    local pattern = string.format("([^%s]+)", sep)
    string.gsub(str, pattern, function(c) fields[#fields+1] = c end)
    return fields
end
JS.newRequest(
    JS.stringFunc(
        [[return getDirectoryItems()]]
    ),
    function (data)
        directoryItems = stringSplit(data, " / ")
    end
)




local madeRequest = false
function love.update()
    if entranceFile and directoryItems then
        if not madeRequest then
            for _, v in ipairs(directoryItems) do
                JS.newPromiseRequest(
                    JS.stringFunc(
                        [[readAndWrite("%s", "%s")]],
                        realDir..instanceDir,
                        v
                    )
                )
            end
            madeRequest = true
        end

        for _, path in pairs(directoryItems) do
            if not love.filesystem.getInfo(instanceDir..path) then
                return
            end
        end

        love.update = nil
        love.filesystem.mount(instanceDir, "")
        love.filesystem.load(entranceFile)()
    end
end