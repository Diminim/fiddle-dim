love.filesystem.write("_", "") -- Wake up filesystem for JS.FS
love.filesystem.remove("_")

love.filesystem.createDirectory("ext") -- Create a directory for writing external files

require "js"

JS.callJS(
	JS.stringFunc(
        [[uploadWriteDir("%s");]],
		love.filesystem.getSaveDirectory()
	)
)

local function instance(data)
	loadstring(data)()
end

JS.newPromiseRequest(
	JS.stringFunc(
		[[requestData("%s")]],
		"content/main.lua"
	),
	function (data)
		instance(data)
	end
)

function love.run()
	if love.load then love.load(love.arg.parseGameArguments(arg), arg) end

	-- We don't want the first frame's dt to include time taken by love.load.
	if love.timer then love.timer.step() end

	local dt = 0

	-- Main loop time.
	return function()
		-- Process events.
		if love.event then
			love.event.pump()
			for name, a,b,c,d,e,f in love.event.poll() do
				if name == "quit" then
					if not love.quit or not love.quit() then
						return a or 0
					end
				end
				love.handlers[name](a,b,c,d,e,f)
			end
		end

		-- Update dt, as we'll be passing it to update
		if love.timer then dt = love.timer.step() end

		if JS.retrieveData(dt) then
			return
		end

		-- Call update and draw
		if love.update then love.update(dt) end -- will pass 0 if love.timer is disabled

		if love.graphics and love.graphics.isActive() then
			love.graphics.origin()
			love.graphics.clear(love.graphics.getBackgroundColor())

			if love.draw then love.draw() end

			local y = 0
			for i, filename in ipairs(love.filesystem.getDirectoryItems("")) do
				love.graphics.print(filename, 0, y)
				y = y + 16
			end

			-- recursive print
			love.graphics.print("save/", 0, y)
			y = y + 16
			for i, filename in ipairs(love.filesystem.getDirectoryItems("save")) do
				love.graphics.print(filename, 0, y)
				y = y + 16
			end

			love.graphics.present()
		end

		if love.timer then love.timer.sleep(0.001) end
	end
end

function love.draw()
	love.graphics.clear(0.1, 0.1, 0.1)
end
