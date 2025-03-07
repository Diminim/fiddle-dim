-- I have to make the directory unique to the call
-- Then I think mount can handle the rest for me to prevent collisions
-- could use the timestamp!
-- ext/timestamp or uuid

--[[
	I can write a function in js, which is loaded by lua
	That function can then setup the directories.
	And when it's done writing, loadstring the entrance file.
	I can provide something so the author doesn't have to touch js.lua
]]

--[[
	I'm thinking of doing a second layer
	So we have main, this is what lovejs runs
	Then we have instance main, this is what is created
	Then we have the actual user supplied files, this is what is loaded
	Don't forget the lua cache
]]

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

		-- maybe have a loading screen instead of returning?

		-- local update, draw
		-- if JS.retrieveData(dt) then
		-- 	update = fiddle.update
		-- 	draw   = fiddle.draw
		-- else
		-- 	update = love.update
		-- 	draw   = love.draw
		-- end

		JS.retrieveData(dt)

		-- Call update and draw
		if love.update then love.update(dt) end -- will pass 0 if love.timer is disabled

		if love.graphics and love.graphics.isActive() then
			love.graphics.origin()
			love.graphics.clear(love.graphics.getBackgroundColor())

			if love.draw then love.draw() end

			love.graphics.present()
		end

		if love.timer then love.timer.sleep(0.001) end
	end
end

function love.load()
	require "js"
	love.filesystem.createDirectory("ext") -- Create a directory for writing external files
	love.filesystem.load("instance.lua")()
end

function love.update(dt)

end

function love.draw()
	-- I shouldn't have a loading screen but
	-- cookwhale would rock
	-- kissthechef

	local y = 0
	for i, filename in ipairs(love.filesystem.getDirectoryItems("")) do
		love.graphics.print(filename, 0, y)
		y = y + 16
	end

	-- recursive print
	love.graphics.print("ext/", 0, y)
	y = y + 16
	for i, filename in ipairs(love.filesystem.getDirectoryItems("ext")) do
		love.graphics.print(filename, 0, y)
		y = y + 16
	end
end